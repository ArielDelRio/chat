import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/chat/",
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: "dist",
    }),
  ],
  envPrefix: "CHAT_",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/package/index.ts"),
      name: "Chat",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    minify: "terser",
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
  },
});
