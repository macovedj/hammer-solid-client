import { createRequire } from "node:module";
import { defineConfig } from "vite";

const require = createRequire(import.meta.url);
const solid = require("vite-plugin-solid") as typeof import("vite-plugin-solid").default;

export default defineConfig({
  plugins: [solid()],
  server: {
    host: "0.0.0.0",
  },
  preview: {
    host: "0.0.0.0",
  },
});
