const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        body: {
          light: "#ffffff",
          dark: "#15171a"
        },
        header: {
          light: "#1f061f",
          dark: "#0e0d10"
        },
        panel: {
          light: "#240726",
          dark: "#110f13"
        },
        item: {
          light: "#f4f4f4",
          dark: "#1a1c20"
        },
        reacted: {
          light: "#e6f3fa",
          medium: "#1d89c7",
          dark: "#135092"
        },
        "collected-border": {
          light: "#727272",
          dark: "#424242"
        }
      },
      fontFamily: {
        "noto-sans-jp": ['"Noto Sans JP"', "sans-serif"]
      },
      spacing: {
        "header-high": "5.8125rem",
        "header-low": "4.25rem",
        collection: "30vh",
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
        ".shadow-outline": {
          boxShadow: "0 0 0 4px rgba(255,255,255, 0.5)"
        },
        ".shadow-outline-panel-light": {
          boxShadow: "0 0 0 4px #240726"
        },
        ".shadow-outline-panel-dark": {
          boxShadow: "0 0 0 4px #110f13"
        },
        ".shadow-outline-item-light": {
          boxShadow: "0 0 0 4px #adbfca"
        },
        ".shadow-outline-item-dark": {
          boxShadow: "0 0 0 4px #5c7280"
        },
        ".shadow-header": {
          boxShadow: "0 2px 4px rgba(0,0,0, 0.15), 0 8px 8px rgba(0,0,0, 0.075)"
        },
        ".shadow-footer": {
          boxShadow:
            "0 -2px 4px rgba(0,0,0, 0.15), 0 -8px 8px rgba(0,0,0, 0.075)"
        },
        ".item-transition": {
          transition: "box-shadow 0.03s ease-out"
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
