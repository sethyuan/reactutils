import moduleResolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import packageJSON from "./package.json" assert { type: "json" }

const peerDeps = Object.keys(packageJSON.peerDependencies)

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
  plugins: [
    moduleResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    typescript({ tsconfig: "./tsconfig.json" }),
  ],
  external: peerDeps,
}
