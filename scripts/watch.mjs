import { spawn } from "node:child_process";
import { watch } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

const STYLES_DIR = path.join(root, "styles");
const PUBLIC_DIR = path.join(root, "public");
const INPUT_CSS = path.join(STYLES_DIR, "app.css");
const OUTPUT_CSS = path.join(PUBLIC_DIR, "app.css");
const TAILWIND_CLI = path.join(root, "node_modules/@tailwindcss/cli/dist/index.mjs");

/** Tailwind がクラスを拾う対象。ここを変えたら CSS も作り直す必要がある */
const TEMPLATE = "index.html";

/** 保存が連続したときに、1回のビルドにまとめるための待ち時間（ミリ秒） */
const DEBOUNCE = 50;

/**
 * ビルドは子プロセスで実行する。Tailwind CLI 自体の `--watch` を使わないのは、
 * 素の `--watch` が stdin のクローズを検知して終了してしまい、TTY のない
 * 実行環境では即座に抜けてしまうため。フルビルドは 130ms 程度なので、
 * 変更のたびに起動し直しても体感には響かない。
 */
const runBuild = () =>
  new Promise((resolve) => {
    const args = [TAILWIND_CLI, "--input", INPUT_CSS, "--output", OUTPUT_CSS, "--minify"];

    spawn(process.execPath, args, { stdio: "inherit" }).on("exit", resolve);
  });

/**
 * まず1回ビルドし、そのあとは CSS のソース（styles/）とテンプレート（public/index.html）の
 * 変更を待って再ビルドする。ブラウザの自動リロードはしない。
 */
export const buildAndWatch = async () => {
  await runBuild();

  let timer = null;
  // 前のビルドが終わってから次を始める（出力ファイルの書き込みが重ならないように）
  let builds = Promise.resolve();

  const scheduleRebuild = () => {
    // 保存が連続したときは、最後の変更から DEBOUNCE だけ待って1回のビルドにまとめる
    clearTimeout(timer);
    timer = setTimeout(() => {
      builds = builds.then(runBuild);
    }, DEBOUNCE);
  };

  watch(STYLES_DIR, { recursive: true }, scheduleRebuild);

  // public/ は再帰で見張らない。4万枚の画像を抱えているうえ、ビルドが書き出す
  // public/app.css を拾ってビルドが無限に走ってしまう。
  // 直下だけを見て index.html の変更に絞る（エディタが保存時にファイルを
  // 置き換える場合でも、ディレクトリを見ていれば取りこぼさない）。
  watch(PUBLIC_DIR, (_event, filename) => {
    if (filename === TEMPLATE) scheduleRebuild();
  });

  console.log("watching styles/ and public/index.html for changes (ブラウザは手動でリロードしてください)");
};
