const pkg = require("./package.json");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const filesize = require("rollup-plugin-filesize");

// add terser
export default [
  {
    input: "build/index.js",
    output: {
      file: pkg["module"],
      format: "esm",
    },
    plugins: [nodeResolve(), filesize()],
  },
];
