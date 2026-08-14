import { copyFile, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const MODULES = path.join(root, "node_modules");
const OUT_DIR = path.join(root, "public");

/** 同時に開くファイル数。4万枚あるので直列だと待ち時間だけで数倍かかる */
const CONCURRENCY = 64;

/**
 * node_modules から public/ に持ってくるもの。`from` はファイルでもディレクトリでもよい。
 * `exts` を書いた場合は、その拡張子のファイルだけをコピーする。
 *
 * ここでコピーしたものは .gitignore してあるので、リポジトリには入らない。
 */
const ASSETS = [
  // デコモジの画像。JSON の `path` が `decomoji/<category>/<name>.png` なので、その形に合わせる
  { from: "decomoji/decomoji/basic", to: "decomoji/basic" },
  { from: "decomoji/decomoji/extra", to: "decomoji/extra" },
  { from: "decomoji/decomoji/explicit", to: "decomoji/explicit" },

  // 一覧とバージョンの定義。バンドルしないので実行時に fetch する
  { from: "decomoji/configs/v5_all.json", to: "configs/v5_all.json" },
  { from: "decomoji/configs/v5_versions.json", to: "configs/v5_versions.json" },

  // vue は package.json でバージョン管理するがブラウザから直接読むためアセットとしてコピーする
  { from: "vue/dist/vue.esm-browser.prod.js", to: "vendor/vue.js" },
];

/** items を limit 本の並列で流す */
const pool = async (items, limit, fn) => {
  let cursor = 0;

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) await fn(items[cursor++]);
    }),
  );
};

const copyDir = async (src, dest, exts) => {
  const entries = await readdir(src, { recursive: true, withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && (!exts || exts.includes(path.extname(e.name))))
    .map((e) => path.relative(src, path.join(e.parentPath, e.name)));

  // コピー中に mkdir が重ならないよう、必要なディレクトリを先に作っておく
  const dirs = new Set(files.map((file) => path.dirname(file)));
  await Promise.all([...dirs].map((dir) => mkdir(path.join(dest, dir), { recursive: true })));

  await pool(files, CONCURRENCY, (file) =>
    copyFile(path.join(src, file), path.join(dest, file)),
  );

  return files.length;
};

const copyFileTo = async (src, dest) => {
  await mkdir(path.dirname(dest), { recursive: true });
  await copyFile(src, dest);

  return 1;
};

const copyAsset = async ({ from, to, exts }) => {
  const src = path.join(MODULES, from);
  const dest = path.join(OUT_DIR, to);

  return (await stat(src)).isDirectory() ? copyDir(src, dest, exts) : copyFileTo(src, dest);
};

// 消えたデコモジの取り残しはあるが、JSON から参照されなくなるだけなので消さずに上書きしていく
const counts = await Promise.all(ASSETS.map(copyAsset));

console.log(`copied ${counts.reduce((a, b) => a + b, 0)} files into public/`);
