const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        // Slack のデフォルトテーマの紫
        aubergine: {
          800: "#240726",
          900: "#1f061f"
        },
        // くすんだブルー
        danube: {
          200: "#adbfca",
          600: "#5c7280"
        },
        // 黒そうで黒くない、少しだけ青い黒
        night: {
          800: "#110f13",
          900: "#0e0d10"
        },
        // Slackで自分がリアクションしたときの青
        sea: {
          200: "#e6f3fa",
          500: "#1d89c7",
          800: "#135092"
        },
        // 無彩色系
        shade: {
          100: "#ffffff",
          200: "#f4f4f4",
          400: "#727272",
          600: "#424242",
          800: "#1a1c20",
          900: "#15171a",
          1000: "#000000"
        }
      },
      fontFamily: {
        "noto-sans-jp": ['"Noto Sans JP"', "sans-serif"]
      },
      spacing: {
        23: "5.8125rem",
        17: "4.25rem",
        "30vh": "30vh",
        "3px": "3px",
        "5px": "5px",
        "10px": "10px",
        "16px": "16px",
        "32px": "32px",
        "64px": "64px"
      }
    }
  },
  variants: {
    focus: ["hover", "focus"],
    textColor: ["responsive", "hover", "focus", "focus-within"]
  },
  plugins: [
    plugin(function({ addUtilities, variants }) {
      const newUtilities = {
        ".shadow-shade-100-op50": {
          boxShadow: "0 0 0 4px rgba(255,255,255, 0.5)"
        },
        ".shadow-danube-200": {
          boxShadow: "0 0 0 4px #adbfca"
        },
        ".shadow-danube-600": {
          boxShadow: "0 0 0 4px #5c7280"
        },
        ".shadow-bottom": {
          boxShadow: "0 2px 4px rgba(0,0,0, 0.15), 0 8px 8px rgba(0,0,0, 0.075)"
        },
        ".shadow-top": {
          boxShadow:
            "0 -2px 4px rgba(0,0,0, 0.15), 0 -8px 8px rgba(0,0,0, 0.075)"
        },
        ".grid-template-columns-xl": {
          gridTemplateColumns: "repeat(auto-fill, minmax(128px, 1fr))"
        },
        ".grid-template-columns-l": {
          gridTemplateColumns: "repeat(auto-fill, minmax(84px, 1fr))"
        },
        ".grid-template-columns-m": {
          gridTemplateColumns: "repeat(auto-fill, minmax(42px, 1fr))"
        },
        ".grid-template-columns-s": {
          gridTemplateColumns: "repeat(auto-fill, minmax(24px, 1fr))"
        }
      };
      addUtilities(newUtilities, variants("focus"));
    })
  ]
};
