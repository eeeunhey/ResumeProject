
# index.ts.d 인터페이스 설명


## 📌 `.d.ts` 파일이란?
- TypeScript에서 **타입 정의만 모아둔 파일**이에요.
- 실제 실행되는 JS 코드는 없고, 오직 **타입 정보(인터페이스, 타입, 선언)**만 들어감.
- 예를 들어, JS 라이브러리에 타입 정의를 붙이고 싶을 때 씀.

---

## 📌 왜 `index.d.ts`로 많이 쓸까?
1. **전역 타입 정의 용도**
   - `index.d.ts`는 프로젝트 루트에 두면 **전역적으로 타입을 인식**
   - import 없이 그냥 바로 `interface Resume { ... }` 같은 타입을 쓸 수 있음.

2. **라이브러리 관례**
   - 타입 정의를 제공하는 NPM 패키지(`@types/express`, `@types/react` 등)도 보통 `index.d.ts`라는 이름으로 배포돼요.
   - 즉, "이 패키지 타입 정의의 시작점"이라는 의미로 `index`를 붙임.
     시작점(Entry Point)”의 개념
        어떤 프로그램이나 라이브러리를 사용할 때 맨 처음 읽히는 파일
        이 패키지를 불러오면 여기서부터 실행/해석을 시작해라”라는 지침 

3. **명확한 역할 구분**
   - `index.ts` → 실제 코드 시작점
   - `index.d.ts` → 타입 정의 시작점  
   이렇게 두 개로 나누면, **코드와 타입을 구분**할 수 있어서 헷갈리지 않음.

---

## 📌 언제 쓰는가?
- **내 프로젝트 전체에서 공유할 타입**을 선언하고 싶을 때
- **JS 라이브러리를 TypeScript에서 쓸 때 타입을 직접 정의**해야 할 때
- **외부 모듈 보강(Module Augmentation)** 이 필요할 때

---

## 📌 간단 예시

### 1. `index.d.ts`에 타입 정의
```ts
// index.d.ts
interface Resume {
  id: string;
  companyName: string;
}
```

### 2. 코드에서 바로 사용 가능
```ts
// app.ts
const resume: Resume = { id: "1", companyName: "Google" };
```
👉 여기서 `Resume`을 import 하지 않았는데도 에러 없이 쓸 수 있음.

---

## ✅ 정리
- `index.d.ts` = 타입 정의 전용 파일  
- **프로젝트 전체에서 공통으로 쓰이는 타입**을 정의할 때, 또는 **JS 라이브러리용 타입 보강**이 필요할 때 만든다.  




## 1. `Job` – 채용 공고 구조

```
interface Job {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
}
```

### 📌 왜 쓸까?
- 회사에서 올린 채용 정보를 코드 안에서 **하나의 데이터 형태**로 정리하기 위해.
- `Job` 객체는 항상 `title`, `description`, `location`, `requiredSkills` 네 가지 속성을 가진다는 **약속**을 만들어줌.

### 🕒 언제 쓰나?
-  여러 공고를 보여줄 때.
- 지원자가 선택한 공고를 저장/조회할 때.

### 💡 예시
```
const job: Job = {
  title: "Frontend Developer",
  description: "React와 TypeScript로 UI 개발",
  location: "Seoul, Korea",
  requiredSkills: ["React", "TypeScript", "HTML", "CSS"],
};
```
-> 이런 형태로 써라 명시

---

## 2. `Resume` – 이력서 구조

```
interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: Feedback;
}
```

### 📌 왜 쓰나?
- 지원자가 올린 이력서를 **객체로 표현**하기 위해.
- `companyName?`, `jobTitle?`는 **있을 수도, 없을 수도 있음**을 표시 (`?` = optional).

### 🕒 언제 쓰나?
- 사용자가 업로드한 이력서를 저장/관리할 때.
- 이력서 평가 결과(`feedback`)를 연결해서 보여줄 때.

### 💡 예시
```
const resume: Resume = {
  id: "1",
  companyName: "Google",
  jobTitle: "Frontend Developer",
  imagePath: "/images/resume-1.png",
  resumePath: "/resumes/resume-1.pdf",
  feedback: {
    overallScore: 85,
    ATS: { score: 90, tips: [] },
    toneAndStyle: { score: 80, tips: [] },
    content: { score: 75, tips: [] },
    structure: { score: 85, tips: [] },
    skills: { score: 88, tips: [] },
  },
};
```

---

## 3. `Feedback` – 이력서 평가 구조

```
interface Feedback {
  overallScore: number;
  ATS: { score: number; tips: ... };
  toneAndStyle: { score: number; tips: ... };
  content: { score: number; tips: ... };
  structure: { score: number; tips: ... };
  skills: { score: number; tips: ... };
}
```

### 📌 왜 쓸까?
- 이력서를 **다양한 기준**으로 평가한 결과를 구조화해서 저장하기 위해.
- 점수(`score`)와 조언(`tips`)을 구분해서 관리 가능.

### 🕒 언제 쓰나?
- AI가 자동으로 이력서를 분석한 결과를 저장할 때.
- 면접 준비 서비스에서 "총점 + 세부 평가"를 보여줄 때.

### 💡 예시
```
const feedback: Feedback = {
  overallScore: 90,
  ATS: {
    score: 92,
    tips: [
      { type: "good", tip: "직무 키워드가 잘 반영됨" },
      { type: "improve", tip: "파일명에 지원자 이름을 포함하세요" },
    ],
  },
  toneAndStyle: {
    score: 85,
    tips: [
      { type: "good", tip: "문장이 간결함", explanation: "불필요한 수식어가 없음" },
      { type: "improve", tip: "성과 중심으로 작성", explanation: "구체적인 수치(%)를 추가하세요" },
    ],
  },
  content: { score: 80, tips: [] },
  structure: { score: 88, tips: [] },
  skills: { score: 89, tips: [] },
};
```

---

# 📝 정리 
- **Job** = “채용 공고 템플릿” → 회사에서 올린 채용 정보
- **Resume** = “지원자가 올린 이력서 구조”
- **Feedback** = “이력서를 평가한 결과와 조언”

👉 이 인터페이스들은 **데이터의 모양(Shape)을 미리 약속**해 두는 도구야.  
이를 통해 **자동완성 지원, 실수 방지, 협업 시 규칙 통일**이 가능해진다.

좋아 ✨ 이번엔 초등학생도 이해할 수 있게 아주 쉽게 풀어볼게!

---


## 📌 왜 이런 (인터페이스)를 만들었을까?

*  **규칙을 맞추려고** 만든 거다.
* 예를 들어, `Job` 카드는 **무조건** `title`, `description`, `location`, `requiredSkills` 네 가지 칸이 있어야 해.
* 만약 친구가 `Job` 카드에 `salary`라는 이상한 칸을 적으면? 🚫 규칙에 안 맞으니까 “틀렸어!” 하고 알려줘.

---

## 📌 언제 쓰일까?

1. **프론트엔드 화면**

   * 웹사이트에서 이력서 리스트를 보여줄 때
   * (예: “Google 지원용 이력서 (총점 85점)”)

2. **서버(API)**

   * 서버가 데이터를 보내줄 때
   * (예: `GET /resumes` 하면 Resume 카드 뭉치를 보내줌)

---

## 🎨 쉽게 비유하자면

* `Job` = 시험 문제지 ✏️
* `Resume` = 내가 낸 답안지 📄
* `Feedback` = 선생님 채점표 📝

이 세 개는 서로 이어져 있어.

* 문제지가 있어야 답안지를 낼 수 있고,
* 답안지가 있어야 채점표가 나오는 거야!

