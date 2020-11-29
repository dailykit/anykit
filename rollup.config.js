const pkg = require("./package.json");
const resolve = require("rollup-plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");

export default [
  {
    external: ["@github/combobox-nav"],
    input: "dist/index.js",
    output: {
      file: pkg["module"],
      format: "es",
    },
    plugins: [resolve(), terser()],
  },
];
