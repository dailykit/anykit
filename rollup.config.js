const pkg = require("./package.json");
const resolve = require("rollup-plugin-node-resolve");

export default [
  {
    input: "build/index.js",
    output: {
      file: pkg["module"],
      format: "iife",
    },
    plugins: [resolve()],
  },
];
