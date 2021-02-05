import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import autoPreprocess from "svelte-preprocess";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";

import yaml from "js-yaml";
const fs = require("fs");
var config = yaml.loadAll(fs.readFileSync("./config.yml"));
const production = !process.env.ROLLUP_WATCH;
export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      dev: !production,

      css: (css) => {
        css.write("public/build/bundle.css");
      },
      preprocess: autoPreprocess(),
      emitCss: true,
    }),
    postcss({
      extract: true,
      minimize: true,
      use: [
        [
          "sass",
          {
            includePaths: ["./node_modules", "./node_modules/bulma", "./src"],
          },
        ],
      ],
    }),
    replace({

      __gamerNerd: JSON.stringify({
        env: {
          api: config[0][process.env.NODE_ENV].url,
          port: config[0][process.env.NODE_ENV].port
				},
      }),
    }),

    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

		!production && serve(),
		
		!production && livereload("public"),
		
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require("child_process").spawn("npm", ["run", "start", "--", "--dev", "--host", config[0][process.env.NODE_ENV].url, "--port", config[0][process.env.NODE_ENV].port ], {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        });
      }
    },
  };
}
