fe-log# 제목

> TL;DR 한 줄 요약

| 필드 | 값 |
| --- | --- |
| 분류 | FE |
| 브랜치 | {{BRANCH_NAME}} |
| 커밋 | [{{COMMIT_SHORT}}]({{COMMIT_URL}}) |
| 원본 코드 | `{{REL_PATH}}` |
| PR | {{PR_URL}} |

## 배경(왜)
여러 개의 이력서가 있을 때 → 한 눈에 회사 이름, 직무, 점수를 보여주는 “작은 카드”가 필요


## ✅ 요약 (필요성을 느끼는 관점)

* “이력서를 여러 개 보여주고 싶은데, 한 줄 텍스트로만 나열하면 너무 밋밋하네?”
* “회사/직무를 카드로 보여주고, 클릭하면 상세 페이지로 가면 딱 좋겠다.”
* 그래서 만든 **ResumeCard**를 만들자 아래 기능 구현하자

  * 회사명/직무 보여주고
  * 클릭 시 상세 페이지로 이동하게 해주는
  * 재사용 가능한 UI 모듈

## 코드

# 📌 코드 구조 먼저 훑어보기

```tsx
import { Link } from "react-router";

const ResumeCard = (
  { resume: { id, companyName, jobTitle, feedback } }: { resume: Resume }
) => {
  return (
    <Link 
      to={'/resume/${resume.id}'} 
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="flex flex-col gap-2">
        <h2 className="!text-black font-bold break-words">{companyName}</h2>
        <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
      </div>
    </Link>
  );
}

export default ResumeCard;
```

---

## 📌 왜 ResumeCard 컴포넌트가 필요할까?

* 우리가 만든 **이력서 목록 페이지(Resume List)** 를 잘 띄우고 싶음
* 여러 개의 이력서가 있을 때 → 한 눈에 회사 이름, 직무, 점수를 보여주는 “작은 카드”로 보여주자
* 그리고 사용자가 그 카드를 클릭하면 → **자세한 이력서 상세 페이지로 이동**하자 

---

## 📌 코드에서 하는 역할 (필요성 느낌으로)

1. `import { Link } from "react-router";`

   * 그냥 `<a>` 태그를 쓰면 새로고침이 돼서 UX가 별로예요.
   * React에서는 화면을 끊김 없이 이동하려고 **`Link`**를 써요.
   * “아, 페이지 간 이동이 필요하구나 → 그럼 `Link`가 필요하겠다!”

2. `const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback } }: { resume: Resume })`

   * ResumeCard는 **Resume 객체를 하나 받아서** 그걸 카드로 보여줘요.
   * “Resume 타입으로 받은 데이터만 쓸 거다 → 타입을 강제하자!”

3. `<Link to={'/resume/${resume.id}'}>`

   * 각 이력서를 클릭하면 `/resume/1`, `/resume/2` 이런 식으로 상세 페이지로 가야 해요.
   * “클릭하면 상세보기 필요하지? → 그럼 id를 이용해 주소를 만들어야겠다!”

4. `<h2>{companyName}</h2>` + `<h3>{jobTitle}</h3>`

   * 카드에 표시할 최소한의 정보: **회사명 + 직무명**
   * “한 눈에 이 이력서가 어떤 회사·어떤 직무용인지 알 수 있어야겠다!”

5. `className="resume-card animate-in fade-in duration-1000"`

   * 그냥 텍스트만 보이면 밋밋해요.
   * 애니메이션과 스타일을 줘서 “카드 느낌”을 살림.
   * “UX를 좀 더 좋게 하고 싶다 → Tailwind 클래스 넣자!”

---

## 📌 언제, 어디에 쓰는가?

* **ResumeList.tsx** 같은 목록 화면에서

```tsx
{resumes.map(resume => (
  <ResumeCard key={resume.id} resume={resume} />
))}
```

* 이렇게 쓰면, 여러 개의 카드가 만들어지고 → 클릭하면 각각 상세 페이지로 이동할 수 있음.

---


<!-- Created: 2025-09-28 13:37 -->



