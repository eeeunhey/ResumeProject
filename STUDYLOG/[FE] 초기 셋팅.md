# Vite 프로젝트 생성 · 필수 패키지 · Home 레이아웃 정리 (확장판)

> TL;DR Vite + React + Router v7로 초기 세팅하고, Tailwind/애니메이션 · 클래스 관리 · PDF 뷰어 · Zustand 전역 상태를 붙였다. Home에 `<main>`/`<section>` 시맨틱 구조를 적용해 레이아웃을 정리했다.

| 필드 | 값 |
| --- | --- |
| 분류 | FE |
| 브랜치 | {{BRANCH_NAME}} |
| 커밋 | [{{COMMIT_SHORT}}]({{COMMIT_URL}}) |
| 원본 코드 | `{{REL_PATH}}` |
| PR | {{PR_URL}} |

---

## 1) `npm create vite@latest .`
- **npm**: Node.js 패키지 매니저(프로젝트 생성/라이브러리 설치·관리).
- **create vite@latest**: 최신 `create-vite`로 템플릿 생성.
- **`.`(점)**: **현재 폴더**에 바로 프로젝트 생성. (`my-app`을 쓰면 새 폴더가 만들어짐)

### 권장 옵션
- 템플릿: **React + TypeScript**
- 라우터: **React Router v7**

### 기본 스크립트(생성 후)
```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

### 자주 쓰는 명령
```bash
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

---

## 2) React Router v7 설치 & 설정

### 설치
```bash
npm i react-router-dom
```

### 최소 라우팅 예제
```tsx
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <div>에러가 발생했어요 😵</div> }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

### 중첩/레이아웃 라우트
```tsx
// src/routes.tsx
import { Outlet } from "react-router-dom";
import Home from "./pages/Home";

function Layout() {
  return (
    <div>
      <header className="p-4 border-b">헤더</header>
      <main className="p-6"><Outlet /></main>
    </div>
  );
}

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <div>About</div> }
    ]
  }
];
```

---

## 3) Tailwind + `tw-animate-css` 설정

### 설치
```bash
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm i -D tw-animate-css
```

### `tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [require("tw-animate-css")]
};
```

### 글로벌 CSS에 Tailwind 지시어
```css
/* src/index.css (또는 main.css) */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 사용 예시
> 플러그인 버전에 따라 클래스 접두가 다를 수 있어요. README 기준으로 사용하세요.
```tsx
<div className="animate__animated animate__fadeIn">페이드 인</div>
{/* 또는 */}
<div className="animate-fadeIn">페이드 인</div>
```

---

## 4) `clsx` + `tailwind-merge` 같이 쓰기 (권장 패턴)

### 설치
```bash
npm i clsx tailwind-merge
```

### `cn` 유틸 생성
```ts
// src/lib/cn.ts
import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 사용 예시
```tsx
import { cn } from "@/lib/cn";

<button className={cn("px-4 py-2 rounded px-2", true && "px-6", "bg-blue-500")}>
  버튼
</button>
// 결과 className: "py-2 rounded bg-blue-500 px-6"
```

---

## 5) `pdfjs-dist`(PDF.js) 기본 렌더링 (Vite용 워커 설정 포함)

### 설치
```bash
npm i pdfjs-dist
```

### 워커 설정 + 1페이지 렌더
Vite에서는 워커를 URL로 지정하는 방식이 간단해요.
```tsx
// src/components/PdfViewer.tsx
import { useEffect, useRef } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url"; // ← Vite

GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (async () => {
      const loadingTask = getDocument("/example.pdf"); // public/example.pdf
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;
    })();
  }, []);

  return <canvas ref={canvasRef} className="border rounded" />;
}
```

### 파일 위치
- `public/example.pdf` 에 두면 `/example.pdf`로 접근 가능.

> Note: React에서 손쉽게 쓰려면 `react-pdf`도 고려 가능. 위 예시는 **순수 pdfjs-dist**만 사용.

---

## 6) `zustand` 상태관리 (persist/devtools 포함)

### 설치
```bash
npm i zustand
```

### 스토어
```ts
// src/stores/useCounter.ts
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type State = { count: number };
type Actions = {
  inc: () => void;
  reset: () => void;
};

export const useCounter = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        inc: () => set((s) => ({ count: s.count + 1 })),
        reset: () => set({ count: 0 }),
      }),
      { name: "counter" } // localStorage key
    ),
    { name: "CounterStore" }
  )
);
```

### 사용 (selector로 불필요 렌더 방지)
```tsx
import { useCounter } from "@/stores/useCounter";

export default function Counter() {
  const count = useCounter((s) => s.count);
  const inc = useCounter((s) => s.inc);
  const reset = useCounter((s) => s.reset);

  return (
    <div className="space-x-2">
      <span>count: {count}</span>
      <button onClick={inc} className="px-2 py-1 border rounded">+1</button>
      <button onClick={reset} className="px-2 py-1 border rounded">reset</button>
    </div>
  );
}
```

---

## 7) Home 레이아웃: `<main>` / `<section>` 적용 (오탈자 수정 포함)

```tsx
// src/pages/Home.tsx
import { cn } from "@/lib/cn";

export default function Home() {
  const container = cn("container mx-auto px-4", "px-6");

  return (
    <main className={container}>
      <section className={cn("main-section", "py-6")}>
        <div className="page-heading mb-4">
          <h1 className="text-2xl font-bold">Home</h1>
          <p className="text-sm text-gray-500">환영합니다 👋</p>
        </div>

        <div className="space-y-3">
          <p>여기에 페이지 콘텐츠를 배치합니다.</p>
        </div>
      </section>
    </main>
  );
}
```

> **주의:** `<sestion>` → `<section>` 으로 수정 ✅

---

## 8) 트러블슈팅

- **Tailwind 클래스가 안 먹는다**  
  - `tailwind.config.js`의 `content` 경로에 `./src/**/*.{ts,tsx}` 포함됐는지 확인  
  - 글로벌 CSS에 `@tailwind` 세 줄 추가했는지 확인  
- **tw-animate-css 클래스가 안 보인다**  
  - `plugins: [require("tw-animate-css")]` 추가했는지  
  - 플러그인 문서의 실제 클래스명 확인(예: `animate__fadeIn` vs `animate-fadeIn`)  
- **PDF가 안 보인다**  
  - 워커 경로 설정(`GlobalWorkerOptions.workerSrc`) 확인  
  - 파일 경로 `/example.pdf`가 맞는지(빌드 후 `public/` 기준)  
- **zustand가 매 렌더마다 다 그린다**  
  - 셀렉터 사용(`useStore(s => s.some)`)  
  - 불변 업데이트 유지(set에 함수형 업데이트 권장)

---

## 9) 오늘 작업 한 줄 요약 (TIL)
- Vite + React + Router v7 기반 세팅
- Tailwind & tw-animate-css 적용
- `clsx` + `tailwind-merge` → `cn` 유틸 구축
- pdfjs-dist 워커 설정 + 1페이지 렌더
- Zustand 전역 스토어(persist/devtools) 도입
- Home에 `<main>`/`<section>` 시맨틱 구조 반영
