import { sentryVitePlugin } from "@sentry/vite-plugin";
import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, splitVendorChunkPlugin } from "vite";

export default defineConfig({
  server: {
    headers: {
      "Document-Policy": "js-profiling",
    },
  },

  plugins: [
    react(),
    splitVendorChunkPlugin(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: "stats.html",
      open: true,
    }),
    sentryVitePlugin({
      org: "sentry",
      project: "ds-viewer",
      url: "https://sentry.yoshino-s.xyz",
    }),
  ],

  resolve: {
    alias: {
      "@/": `${resolve(__dirname, "src")}/`,
    },
  },

  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("@mantine")) {
            return "@mantine";
          }
          if (id.includes("@sentry")) {
            return "@sentry";
          }
          if (
            id.includes("react-router-dom") ||
            id.includes("@remix-run") ||
            id.includes("react-router")
          ) {
            return "@react-router";
          }
          if (id.includes("highlight.js")) {
            return "highlight.js";
          }
          if (
            id.includes("remark") ||
            id.includes("rehype") ||
            id.includes("unified") ||
            id.includes("mdast") ||
            id.includes("micromark")
          ) {
            return "@rehype";
          }
        },
      },
    },
  },
});
