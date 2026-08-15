import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..", "public");
const PORT = Number(process.env.PORT) || 1234;
const MIME = {
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

//
const resolver = async (pathname) => {
  const filepath = path.join(ROOT, pathname);

  // パストラバーサルを許可しない
  if (path.relative(ROOT, filepath).split(path.sep)[0] === "..") return null;

  const candidates = [filepath, path.join(filepath, "index.html")];

  for (const candidate of candidates) {
    // 存在しない場合は null になるので、次の候補を試す
    const stats = await stat(candidate).catch(() => null);

    // ディレクトリそのものは返さず、その中の index.html を試す
    if (stats?.isFile()) return { file: candidate, stats, ext: path.extname(f) };
  }

  return null;
};

const sender = async (request, response, status, { ext, file, stats }, pathname) => {
  // サイズと更新時刻が一致すれば同じ内容とみなす。ここでは中身を読まずに済ませたいのでハッシュは取らない
  const etag = `W/"${stats.size.toString(16)}-${stats.mtimeMs.toString(16)}"`;
  const headers = {
    "cache-control": ["/configs/", "/decomoji/"].some((dir) => pathname.startsWith(dir)) ? "no-cache" : "no-store",
    "content-type": MIME[ext] ?? "application/octet-stream",
    etag,
  };

  // 変わっていなければ本文を流さない。5MB の JSON が毎回飛ばなくなる
  if (status === 200 && request.headers["if-none-match"] === etag) {
    response.writeHead(304, headers);
    response.end();
    return;
  }

  response.writeHead(status, headers);
  response.end(await readFile(file));
};

const server = createServer(async (request, response) => {
  try {
    const { pathname } = new URL(request.url, `http://localhost:${PORT}`);
    const decoded = decodeURIComponent(pathname);
    const source = await resolver(decoded);

    if (source) {
      await sender(request, response, 200, source, decoded);
      return;
    }

    // このアプリはクエリパラメータだけで状態を表すため、未知のパスは素直に 404 でよい
    const notFound = await resolver("/404.html");

    if (notFound) {
      await sender(request, response, 404, notFound, "/404.html");
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

// IPv4 で起動する
server.listen(PORT, "127.0.0.1", () => console.log(`http://localhost:${PORT}/`));
