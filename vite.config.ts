import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  appType: "spa",
  server: {
    cors: true,
  },
  plugins: [reactRouter(), devtoolsJson(), tsconfigPaths()],
  build: {
    sourcemap: true,
    assetsDir: "static",
    manifest: true,
  },
});
