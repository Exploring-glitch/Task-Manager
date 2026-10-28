import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        rollupOptions: {
            output: {
                // Keep rarely changing vendor code in its own chunks so app
                // updates do not invalidate the whole bundle.
                manualChunks: {
                    react: ["react", "react-dom", "react-router-dom"],
                    charts: ["recharts"],
                    vendor: ["axios", "moment", "react-hot-toast", "react-icons"],
                },
            },
        },
    },
    server: {
        port: 5173,
        proxy: {
            // Lets the frontend talk to the API without cross-site cookies
            // during local development.
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
});
