import { defineConfig } from "tsup";

export default defineConfig([
  {
    clean: true,
    dts: true,
    entry: ["src/components/ui"],
    format: ["esm", "cjs"],
    sourcemap: true,
    minify: true,
    target: "esnext",
    outDir: "dist/ui",
    splitting: true,
    external: ["react", "react-dom"],
    tsconfig: "./tsconfig.json",
  },
  {
    clean: true,
    dts: true,
    entry: ["src/views", "src/theme", "src/translate", "src/model"],
    format: ["esm", "cjs"],
    sourcemap: true,
    minify: true,
    target: "esnext",
    outDir: "dist",
    splitting: true,
    external: ["react", "react-dom"],
    tsconfig: "./tsconfig.json",
  },
  {
    clean: true,
    dts: false,
    entry: ["src/legacy"],
    format: ["esm", "cjs"],
    sourcemap: false,
    minify: true,
    target: "esnext",
    outDir: "dist/legacy",
    splitting: true,
    external: ["react", "react-dom"],
    tsconfig: "./tsconfig.json",
  },
]);
