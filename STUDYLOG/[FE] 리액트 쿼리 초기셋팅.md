좋습니다 👍 React Query(=TanStack Query) 기본 셋팅 과정을 정리해드릴게요.
**React + Vite + TypeScript** 기준으로 설명할게요.

---

## 1. 설치

```bash
npm install @tanstack/react-query
```

(개발자 도구용)

```bash
npm install @tanstack/react-query-devtools
```

---

## 2. QueryClient 설정 (전역)

프로젝트 최상단(App.tsx 같은 곳)에 `QueryClientProvider`로 감싸야 해요.

```tsx
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,         // 실패시 재시도 횟수
      refetchOnWindowFocus: false, // 윈도우 포커스시 재호출 방지
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} /> 
    </QueryClientProvider>
  </React.StrictMode>
);
```

---

## 3. API 요청 (axiosInstance 사용 권장)

공용 axios instance 만들어두면 관리 편해요.

```ts
// src/utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://172.31.57.139:8080/api", // 환경별로 바꿀 수 있게 .env 관리 추천
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
```

---

## 4. React Query 훅 사용 예시

로그인 API 예시 들어볼게요.

```tsx
// src/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

interface LoginInput {
  id: string;
  pw: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const res = await axiosInstance.post("/user/login", data);
      return res.data;
    },
  });
}
```

페이지에서 쓰기:

```tsx
// src/pages/Login.tsx
import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const { mutate: login, isPending, isError, data } = useLogin();
  const [form, setForm] = useState({ id: "", pw: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(form, {
      onSuccess: (res) => {
        console.log("로그인 성공!", res);
      },
      onError: () => {
        alert("로그인 실패");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="아이디"
        value={form.id}
        onChange={(e) => setForm({ ...form, id: e.target.value })}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={form.pw}
        onChange={(e) => setForm({ ...form, pw: e.target.value })}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "로그인 중..." : "로그인"}
      </button>
      {isError && <p>에러 발생!</p>}
    </form>
  );
}
```

---

✅ 여기까지 하면

* **전역 캐싱/에러/로딩 관리 자동화**
* `useMutation`, `useQuery`로 데이터 패칭 구조화 가능
* axiosInstance로 API 일관성 확보

---

1) 의존성 설치
# 새 프로젝트
npm create vite@latest my-app -- --template react-ts
cd my-app

# SWC 플러그인으로 교체
npm i -D @vitejs/plugin-react-swc

# (선택) 경로 별칭 쓰면 편해요
npm i -D vite-tsconfig-paths

# (선택) 개발 중 타입체크용
npm i -D vite-plugin-checker