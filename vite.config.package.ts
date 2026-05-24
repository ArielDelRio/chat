// vite.config.softphone.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  envPrefix: "CHAT_",
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/package/index.ts"),
      name: "Chat",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@emotion/react",
        "@emotion/styled",
        "@mui/material",
        "@mui/system",
        "@mui/icons-material",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@emotion/react": "emotionReact",
          "@emotion/styled": "emotionStyled",
          "@mui/material": "muiMaterial",
          "@mui/system": "muiSystem",
          "@mui/icons-material": "muiIconsMaterial",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
