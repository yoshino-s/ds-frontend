import { reactRouter } from "@react-router/dev/vite";
import {
  type SentryReactRouterBuildOptions,
  sentryReactRouter,
} from "@sentry/react-router";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";

const sentryConfig: SentryReactRouterBuildOptions = {
  telemetry: false,
  project: "devsecops_ssl-op-demo-new",
  sourceMapsUploadOptions: {
    filesToDeleteAfterUpload: [],
  },
  // An auth token is required for uploading source maps.
  authToken:
    "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",
};

export default defineConfig({
  appType: "spa",
  server: {
    cors: true,
  },
  plugins: [
    reactRouter(),
    devtoolsJson(),
    tsconfigPaths(),
    sentryReactRouter(sentryConfig, {
      command: "build",
      mode: "production",
    }),
  ],
  build: {
    sourcemap: true,
    assetsDir: "static",
    manifest: true,
  },
});
