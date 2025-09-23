import { type RouteConfig, index } from "@react-router/dev/routes";

export default [index("routes/home.tsx")] satisfies RouteConfig;
//경로 기입
//index("routes/home.tsx") → / (루트 경로)로 들어왔을 때 
// routes/home.tsx 페이지를 보여줌. 홈 페이지 경로 지정.

