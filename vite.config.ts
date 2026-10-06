import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // esbuild minification is ~20x faster than terser with near-identical output.
    minify: "esbuild",
    cssMinify: "esbuild",
    // Modern browsers only -> no legacy transpilation weight in the bundle.
    target: "es2020",
    // Inline small assets as data URIs to remove extra network round-trips.
    assetsInlineLimit: 4096,
    // Source maps add megabytes to the payload; disabled for production.
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1200,
  },
  esbuild: {
    // Strip debug statements from the production bundle.
    drop: ["console", "debugger"],
    legalComments: "none",
  },
});
