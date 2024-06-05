import { defineConfig } from "tsup";

export default defineConfig([
  {
    dts: true,
    entry: [
      "src/theme",
      "src/translate",
      "src/model",
      "src/client",
      "src/server",
    ],
    format: ["esm", "cjs"],
    minify: true,
    target: "esnext",
    outDir: "dist",
    splitting: true,
    external: ["react", "react-dom"],
    tsconfig: "./tsconfig.json",
  },
  {
    dts: true,
    entry: ["src/legacy/views"],
    format: ["esm", "cjs"],
    minify: true,
    target: "esnext",
    outDir: "dist/legacy/views",
    splitting: true,
    external: ["react", "react-dom"],
    tsconfig: "./tsconfig.json",
  },
  {
    dts: false,
    entry: ["src/legacy"],
    format: ["esm", "cjs"],
    minify: true,
    target: "esnext",
    outDir: "dist/legacy",
    splitting: true,
    external: ["react", "react-dom"],
    tsconfig: "./tsconfig.json",
  },
  {
    entry: ["src/components"],
    format: ["esm", "cjs"],
    minify: true,
    target: "esnext",
    outDir: "dist/ui",
    splitting: true,
    external: ["react", "react-dom"],
    tsconfig: "./tsconfig.json",
    dts: true,
  },
]);
