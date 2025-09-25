import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(),   // TailwindCSS 적용
            reactRouter(),   // React Router 파일 기반 라우팅 적용
            tsconfigPaths()],  // tsconfig.json 경로 별칭 자동화 
});
