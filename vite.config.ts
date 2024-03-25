import { sentryVitePlugin } from "@sentry/vite-plugin";
import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    headers: {
      "Document-Policy": "js-profiling",
    },
  },

  plugins: [
    react(),
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
  },
});
