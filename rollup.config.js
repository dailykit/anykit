const pkg = require("./package.json");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");
const filesize = require("rollup-plugin-filesize");

// add terser
const config = {
  input: "build/index.js",
  output: {
    file: pkg["module"],
    format: "esm",
  },
  plugins: [nodeResolve(), filesize()],
};

if (process.env.NODE_ENV === "production") config.plugins.push(terser());

module.exports = exports = config;
