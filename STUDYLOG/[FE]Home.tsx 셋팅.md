

# 📌 코드 설명

**홈 화면(“/”)에 서비스 소개 + 이력서 카드 목록을 보여주는 페이지 컴포넌트**예요.
방문자는 들어오자마자 서비스가 뭘 해주는지 이해하고, 바로 **이력서 카드**를 눌러 상세로 이동할 수 있어요.

---

# 코드 라인별로 “왜 이걸 썼나?”

```ts
import { resumes } from "~/constants";
```

* **왜**: 홈에서 바로 카드 리스트를 렌더링하려면 데이터가 필요해요.
* **언제**: 백엔드 연동 전엔 Mock 데이터로, 이후엔 로더/페치로 교체.
* **효과**: “보여주기 중심” 홈 경험 완성.

```ts
import type { Route } from "./+types/home";
```

* **왜**: `meta()` 같은 라우트 훅에 **타입 안전성**을 부여해 IDE 자동완성/오류 방지.
* **언제**: 라우팅 프레임워크(React Router v7/Remix 등)에서 제공하는 타입을 사용할 때.
* **효과**: 메타 작성 시 실수(오타/형식 오류) 예방.

```ts
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
```

* **왜**: **레이아웃 구성 요소(네비게이션)**, **도메인 카드 UI**를 분리 → 재사용/테스트 용이.
* **효과**: 유지보수성과 일관된 UI 확보.

```ts
export function meta({}: Route.MetaArgs) {
  return [
    { title: "NextArc" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
```

* **왜**: SEO/공유용 **문서 메타 정보** 설정(브라우저 탭 제목, 설명).
* **언제**: 검색 결과/소셜 미리보기 품질 중요할 때.
* **팁**: 실제 서비스 문구로 바꾸세요 (예: `"커리어 기록을 한눈에, AI 피드백까지"`).


```tsx
{resumes.length > 0 && (
  <div>
    {resumes.map((resume) => (
      <ResumeCard key={resume.id} resume={resume} />
    ))}
  </div>
)}
```

* **왜**: 데이터가 있을 때만 목록 렌더 → **빈 상태/깜빡임 방지**.
* **map**: 카드 **반복 렌더**로 리스트 구성.
* **key**: React가 항목을 안정적으로 추적하도록 **성능/정합성** 확보.
* **ResumeCard**: 카드 UI를 **캡슐화**(클릭 시 상세 이동, 회사/직무/점수 등 표시).


> : ``to={`/resume/${resume.id}`}``
> (이걸로 **카드 클릭 → `/resume/1`** 같은 상세로 제대로 이동)
![화면기록](STUDYLOG/Images/250928_화면.png)
<!-- Created: 2025-09-28 22:25 -->

---



