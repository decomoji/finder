import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildAndWatch } from "./watch.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const OUT_DIR = path.join(root, "public");
const PORT = Number(process.env.PORT ?? 1234);
const WATCH = process.argv.includes("--watch");

const CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  // vendor/ の JS には .js.map が並んでいる
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

/**
 * postinstall が置くもので、編集対象ではない（変わるのは npm install したときだけ）。
 * v5_all.json は 5MB、デコモジの画像は4万枚あるので、リロードやスクロールのたびに
 * 取り直させない。ここに挙げたものだけ、ブラウザに保存させて 304 で済ませる。
 */
const REVALIDATE_DIRS = ["/configs/", "/decomoji/"];

/**
 * 編集するファイル（index.html / app.css / vendor）は常に取り直させる。
 * それ以外は保存を許すが、使う前に必ず問い合わせさせる（`no-cache` は
 * 「キャッシュ禁止」ではなく「毎回検証しろ」の意味）。
 */
const cacheControlFor = (pathname) =>
  REVALIDATE_DIRS.some((dir) => pathname.startsWith(dir)) ? "no-cache" : "no-store";

/** URLのパスに対応する public/ 配下のファイルを探す。ディレクトリならその中の index.html を指す */
const resolveAsset = async (pathname) => {
  const file = path.join(OUT_DIR, pathname);

  // パストラバーサル（`/../secret`）で public/ の外を指していたら弾く。先頭の階層が `..` なら外に出ている
  if (path.relative(OUT_DIR, file).split(path.sep)[0] === "..") return undefined;

  for (const f of [file, path.join(file, "index.html")]) {
    // 存在しない場合は undefined になるので、次の候補を試す
    const stats = await stat(f).catch(() => undefined);

    // ディレクトリそのものは返さず、その中の index.html を試させる
    if (stats?.isFile()) return { file: f, stats, ext: path.extname(f) };
  }

  return undefined;
};

const sendAsset = async (request, response, status, asset, pathname) => {
  // サイズと更新時刻が一致すれば同じ内容とみなす。ここでは中身を読まずに済ませたいのでハッシュは取らない
  const etag = `W/"${asset.stats.size.toString(16)}-${asset.stats.mtimeMs.toString(16)}"`;
  const headers = {
    "content-type": CONTENT_TYPES[asset.ext] ?? "application/octet-stream",
    "cache-control": cacheControlFor(pathname),
    etag,
  };

  // 変わっていなければ本文を流さない。5MB の JSON が毎回飛ばなくなる
  if (status === 200 && request.headers["if-none-match"] === etag) {
    response.writeHead(304, headers);
    response.end();
    return;
  }

  response.writeHead(status, headers);
  response.end(await readFile(asset.file));
};

const server = createServer(async (request, response) => {
  try {
    const { pathname } = new URL(request.url, `http://localhost:${PORT}`);
    const decoded = decodeURIComponent(pathname);
    const asset = await resolveAsset(decoded);

    if (asset) {
      await sendAsset(request, response, 200, asset, decoded);
      return;
    }

    // このアプリはクエリパラメータだけで状態を表すため、未知のパスは素直に 404 でよい
    const notFound = await resolveAsset("/404.html");

    if (notFound) {
      await sendAsset(request, response, 404, notFound, "/404.html");
    } else {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not Found");
    }
  } catch (error) {
    // 壊れたURL（`/%` など）でサーバーを落とさない
    const status = error instanceof URIError ? 400 : 500;

    console.error(`${status} ${request.url}: ${error.message}`);
    response.writeHead(status, { "content-type": "text/plain; charset=utf-8" });
    response.end(status === 400 ? "Bad Request" : "Internal Server Error");
  }
});

server.on("error", (error) => {
  if (error.code !== "EADDRINUSE") throw error;

  console.error(`ポート${PORT}は使用中です。PORT=2345 npm start のように別のポートを指定してください。`);
  process.exit(1);
});

if (WATCH) await buildAndWatch();

server.listen(PORT, "localhost", () => console.log(`http://localhost:${PORT}/`));
