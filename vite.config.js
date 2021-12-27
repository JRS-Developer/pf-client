import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.REACT_APP_SERVER": `"${process.env.REACT_APP_SERVER}"`,
    "process.env.REACT_APP_SOCKET": `"${process.env.REACT_APP_SOCKET}"`,
  }
})
