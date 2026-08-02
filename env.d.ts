/// <reference types="vite/client" />

/**
 * decomoji のコンフィグを明示的に型付けする。
 *
 * v5_all.json は 5MB / 40,000 件を超えるため、resolveJsonModule に推論させると
 * 巨大なリテラル型が生成され、TS サーバがファイルを読み込めず型が `{}` に落ちる。
 * ここで型を宣言してファイルの中身を読ませないようにする。
 */
declare module "decomoji/configs/v5_all.json" {
  const decomojis: {
    name: string;
    category: string;
    path: string;
    created: string;
    updated?: string;
  }[];
  export default decomojis;
}

declare module "decomoji/configs/v5_versions.json" {
  const versions: string[];
  export default versions;
}
