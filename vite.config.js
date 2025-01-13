import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { imagetools } from "vite-imagetools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: new URLSearchParams({
        format: "webp;q=1,jpeg;q=0.9", // Prefer WebP with JPEG fallback
        quality: "80", // Balanced quality setting
        w: "1280", // Default max width
        as: "picture", // Generate picture element
      }),
    }),
  ],
  server: {
    host: "0.0.0.0", // Allows external network access
    port: 3000,
  },
});
