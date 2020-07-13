"use strict";

const fs = require("fs");

const category = ["Basic", "Extra", "Explicit"];

function generate_decomoji_ts(type) {
  fs.readdir(
    `./node_modules/slack-reaction-decomoji/decomoji/${type.toLowerCase()}/`,
    (err, files) => {
      if (err) {
        if (err.code === "ENOENT") {
          // ディレクトリにファイルがない場合、空配列を出力させる
          files = ["."];
        } else {
          throw err;
        }
      }

      const decomoji_array = files.reduce((memo, file) => {
        return /^\./.test(file) ? memo : memo.concat(file.split(".")[0]);
      }, []);

      fs.writeFile(
        `./src/configs/Decomoji${type}.ts`,
        `export const Decomoji${type} = ` +
          JSON.stringify(decomoji_array) +
          ";",
        (err) => {
          if (err) throw err;
          console.log(
            `./src/configs/Decomoji${type}.ts (${decomoji_array.length} items) has been saved!`
          );
        }
      );
    }
  );
}

category.forEach((item) => generate_decomoji_ts(item));
