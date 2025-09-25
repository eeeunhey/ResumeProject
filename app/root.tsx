import {
  isRouteErrorResponse,
  Links, //head> 안에 <link> 태그를 자동으로 렌더링 (예: CSS, 폰트 
  Meta,  // <head> 안에 <meta> 태그를 자동으로 렌더링 (SEO, title 등)
  Outlet, //자식 라우트를 보여줄 위치 (레이아웃 안에서 페이지가 바뀌는 자리).
  Scripts, // React Router에서 필요한 <script>들을 자동으로 추가.
  ScrollRestoration, // 페이지 전환 시 스크롤 위치를 복원.
} from "react-router"; // 

import type { Route } from "./+types/root"; //자동 생성된 타입 파일(+types/root)에서 Route 타입만 가져옴.
import "./app.css";


//역할: <head> 안에 필요한 외부 리소스(폰트, CSS 등)를 추가하는 함수.
// Route.LinksFunction 타입은 React Router가 제공하는 링크 함수 형태.
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];


// 전체 HTML 문서의 기본 구조 정의.
// children 자리에 각 페이지(Outlet 내용)가 들어옴.
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

//React Router에서 메인 엔트리 역할.
//<Outlet />은 현재 URL에 맞는 페이지(라우트)를 보여주는 자리.

export default function App() {
  return <Outlet />;
}


// React Router v7의 오류 경계 컴포넌트.
// 페이지 로딩 중 오류가 나면 이 UI가 대신 표시됨.
// 응답 오류(404 등)인지 확인.
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
