import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const removeExportsPlugin = function () {
  return {
    async renderChunk(bundle) {
      const code = bundle.replace(/^export.*/gm, "").trim();
      return { code, map: null };
    },
  };
};

export default {
  input: "src/index.ts",
  output: {
    dir: "build",
    format: "esm",
  },
  plugins: [typescript(), nodeResolve(), commonjs(), removeExportsPlugin()],
};
