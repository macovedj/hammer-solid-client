import solidRefresh from "solid-refresh/dist/babel.cjs";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig(({ command }) => ({
  plugins: [
    solid({
      // WJS currently exposes the CommonJS Babel helper surface more
      // completely than its synthesized ESM namespace. Keep Vite's Solid
      // plugin on its ESM path, then opt into the equivalent CJS refresh
      // transform explicitly so component HMR remains enabled.
      hot: false,
      babel:
        command === "serve"
          ? {
              plugins: [[solidRefresh, { bundler: "vite" }]],
            }
          : {},
    }),
  ],
  server: {
    host: "0.0.0.0",
  },
  preview: {
    host: "0.0.0.0",
  },
}));
