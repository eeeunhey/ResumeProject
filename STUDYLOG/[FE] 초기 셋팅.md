1. npm create vite@latest .
npm
→ Node.js에서 쓰는 패키지 매니저 도구. 새로운 프로젝트를 만들거나, 라이브러리를 설치/관리할 때 사용해요.

create vite@latest
→ vite라는 **프로젝트 생성 도구(create-vite)**를 실행하는 거예요.
vite는 요즘 많이 쓰는 프론트엔드 개발 도구(개발 서버 + 번들러)예요. @latest는 "가장 최신 버전"을 쓰겠다는 뜻.

. (점)
→ 현재 디렉토리(폴더)에 바로 프로젝트를 만든다는 뜻이에요.
만약 my-app처럼 폴더 이름을 쓰면 my-app이라는 새 폴더가 생기고, 그 안에 프로젝트가 생성돼요.
.을 쓰면 지금 내가 있는 폴더에 바로 설치됩니다.

### 선택하기
React -> React Router V7
React Router V7란?
👉 React 앱에서 여러 화면을 오가도록(=라우팅) 도와주는 라이브러리예요.
예를 들어 /login, /signup, /mypage 같은 URL 주소에 따라 서로 다른 컴포넌트를 보여줄 수 있죠.
데이터 로딩/액션을 라우터 레벨에서 다룰 수 있고
중첩 라우트 + 에러 처리가 더 직관적이고
코드 스플리팅/SSR 지원이 강화됐습니다.

npm install -D tw-animate-css
🔎 명령어 구조

npm install
→ npm(패키지 매니저)로 어떤 라이브러리를 설치한다는 뜻.

-D (또는 --save-dev)
→ 개발(Dev) 의존성으로 설치하겠다는 뜻이에요.
개발할 때만 필요한 도구 → package.json의 devDependencies에 기록됩니다.
예: 빌드/테스트용 라이브러리.

실제 배포(프로덕션)에는 포함되지 않아요.
tw-animate-css
→ Tailwind CSS 플러그인 중 하나로, Animate.css
 (애니메이션 라이브러리)를 Tailwind 유틸리티 클래스처럼 쓸 수 있게 해주는 패키지예요.

npm install clsx tailwind-merge pdfjs-dist zustand
좋습니다 👍 말씀하신 네 가지 패키지를 하나씩 풀어서 설명해드릴게요. 이 네 개는 프론트엔드(특히 React + Tailwind) 개발에서 자주 같이 쓰이는 도구들이에요.

---

## 1. **clsx**

👉 **조건부 클래스 이름 관리 도구**

* TailwindCSS 같은 유틸리티 클래스는 문자열로 붙이는데, 조건부로 처리할 때 코드가 지저분해져요.
* `clsx`는 `if/else` 없이 깔끔하게 클래스 합치기를 도와줍니다.

```jsx
import clsx from "clsx";

function Button({ primary, disabled }) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded",
        primary && "bg-blue-500 text-white",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      버튼
    </button>
  );
}
```

✔️ `primary`가 true면 파란색 버튼,
✔️ `disabled`가 true면 회색 비활성화 버튼으로 자동 반영.

---

## 2. **tailwind-merge**

👉 **중복된 Tailwind 클래스 정리해주는 도구**

* Tailwind에서는 같은 속성을 가진 클래스가 겹치면 마지막 게 적용돼요.
* 그런데 여러 조건이 섞이면 `"px-2 px-4"` 같은 중복이 생길 수 있음.
* `tailwind-merge`는 이런 걸 자동으로 **하나만 남겨줍니다.**

```jsx
import { twMerge } from "tailwind-merge";

const button = twMerge("px-2 py-2 bg-blue-500", "px-4");
// 결과: "py-2 bg-blue-500 px-4"
```

✔️ `px-2`와 `px-4`가 충돌하는데 → 최종적으로 `px-4`만 남음.
→ `clsx`랑 같이 쓰면 `className` 관리가 완벽해져요.

---

## 3. **pdfjs-dist**

👉 **브라우저에서 PDF 파일 읽기/렌더링 라이브러리**

* Mozilla(파이어폭스 만든 회사)에서 만든 **PDF.js**의 npm 배포 버전이에요.
* React에서 PDF 뷰어를 만들 때 많이 씁니다.

```jsx
import { pdfjs } from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

async function loadPdf() {
  const pdf = await pdfjs.getDocument("/example.pdf").promise;
  const page = await pdf.getPage(1);

  console.log("페이지 개수:", pdf.numPages);
  console.log("첫 페이지 객체:", page);
}
```

✔️ PDF 파일을 로드하고, 페이지별로 캔버스에 그릴 수 있어요.
✔️ 직접 뷰어를 만들 수도 있고, `react-pdf` 같은 라이브러리 내부에서도 `pdfjs-dist`를 씁니다.

---

## 4. **zustand**

👉 **가볍고 심플한 React 상태 관리 라이브러리**

* Redux처럼 복잡한 설정 필요 없음.
* 전역 상태를 손쉽게 관리할 수 있어요.

```jsx
import { create } from "zustand";

// 상태 정의
const useStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));

// 컴포넌트에서 사용
function Counter() {
  const { count, increase, reset } = useStore();
  return (
    <div>
      <p>현재 값: {count}</p>
      <button onClick={increase}>+1</button>
      <button onClick={reset}>초기화</button>
    </div>
  );
}
```

✔️ `useStore`를 불러오면 어디서든 같은 상태를 공유 가능.
✔️ Redux보다 코드가 훨씬 간단하고 가벼움.

---

## ✅ 정리

| 패키지                | 역할                             |
| ------------------ | ------------------------------ |
| **clsx**           | 조건부 Tailwind 클래스 이름을 깔끔하게 관리   |
| **tailwind-merge** | 중복된 Tailwind 클래스 제거, 마지막 것만 남김 |
| **pdfjs-dist**     | PDF 파일을 브라우저에서 읽고 렌더링하는 도구     |
| **zustand**        | 간단하고 가벼운 React 전역 상태 관리 라이브러리  |

---

👉 원하시면 제가 이 네 가지를 **하나의 React 예제 프로젝트** 안에서 어떻게 같이 쓰이는지 코드로 묶어서 보여드릴 수도 있어요. 그럴까요?

