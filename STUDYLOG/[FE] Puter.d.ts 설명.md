# puter.d.ts 인터페이스 설명



---

# 📄 TypeScript Interfaces 문서

## 📂 FileItem

```ts
/** 파일/폴더 1개에 대한 정보를 정의 */
interface FileItem {
  id: string;                /** 파일을 구분하는 고유번호 (사람 주민번호 같은 것) */
  ownerId: string;           /** 사용자 고유번호 (이 파일의 주인) */
  name: string;              /** 파일/폴더 이름 (예: "사진.png", "문서") */

  path: string;              /** 위치(길) (예: "/내문서/사진.png") */
  isFolder: boolean;         /** 폴더면 true, 파일이면 false */
  parentId: string;          /** 부모 폴더의 id (이 파일을 담고 있는 상자) */
  parentOwnerId: string;     /** 부모 폴더의 주인 고유번호 */

  createdAt: number;         /** 만든 시간(숫자로 저장된 시각) */
  updatedAt: number;         /** 바꾼 시간(수정한 시각) */
  accessedAt: number;        /** 읽은 시간(열어본 시각) */

  size: number | null;       /** 파일 크기(바이트). 폴더면 보통 null */
  canWrite: boolean;         /** 내가 고칠 수 있나? (쓰기 가능) */
}
```

---

## 👤 SimpleUser

```ts
/** 서비스에 로그인한 유저 정보 */
interface SimpleUser {
  id: string;          /** 유저 고유번호 */
  username: string;    /** 유저 이름 (닉네임) */
  /**
   *     id: "u-001",   // 고유번호 (컴퓨터가 구분할 때 쓰는 값)
   *     username: "은혜",      // 닉네임 (화면에 보이는 이름)
   * 
   *    여러명 모아보기 형태
   *    
   *    const users: SimpleUser[] = [
   *      { id: "u-001", username: "은혜" },
   *      { id: "u-002", username: "지구" },
   *      { id: "u-003", username: "성민" },
   *    ];
   */
}
```

---

## 🗒️ KeyValue

```ts
/** 작은 메모장(키=이름, 값=내용) 한 줄 */
interface KeyValue {
  key: string;
  value: string;

  /**
   *  const memo1: KeyValue = {
   *    key: "오늘할일",
   *    value: "숙제하기",
   *  };
   * 
   * const settings: KeyValue[] = [
   *   { key: "테마색", value: "어두운모드" },
   *   { key: "폰트크기", value: "16px" },
   *   { key: "언어", value: "한국어" },
   * ];
   */
}
```

---

## 💬 ChatPiece

```ts
/** 채팅 한 조각(파일 보내기 or 글자 보내기) */
interface ChatPiece {
  type: "file" | "text";   /** 보낸 것의 종류: 파일인지 글자인지 */
  filePath?: string;       /** 파일이면: 파일 위치(길) */
  text?: string;           /** 글자면: 내용 */
  
  /**
   * 텍스트로 보낼 때
   * const helloMsg: ChatPiece = {
   *   type: "text",
   *   text: "안녕! 오늘 뭐 해?",   // 글자 내용
   * };
   * 
   * 파일 형식으로 보낼 때
   * const fileMsg: ChatPiece = {
   *   type: "file",
   *   filePath: "/내문서/사진.png",   // 파일 위치(경로)
   * };
   * 
   * 여러개를 이런식으로 보낸다
   * const mixedMsg: ChatPiece[] = [
   *   { type: "text", text: "여기 내 사진이야!" },
   *   { type: "file", filePath: "/내사진/여행.png" },
   * ];
   */
}
```

---

## 💭 ChatMessage

```ts
/** 채팅 메시지 1개 */
interface ChatMessage {
  role: "user" | "assistant" | "system";    /** 누가 말했나 */
  content: string | ChatPiece[];            /** 내용(그냥 글자거나, 조각(ChatPiece)들의 배열) */

  /**  content: [{ type: "text", text: "안녕! 내 사진 어때?" }], */  -> 텍스트형식으로 정보 전송
  /**  content: [{ type: "file", filePath: photo.path }], */        -> 파일 형식으로 정보 전송
}
```

---

## ⚙️ ChatOptions

```ts
/** AI에게 넣는 옵션들 */
interface ChatOptions {

  model?: string;         /** 어떤 모델 쓸까? (두뇌 종류) */
  stream?: boolean;       /** 스트리밍(말을 이어서) 받을까? */
  maxTokens?: number;     /** 최대 글자 수(토큰 수) 제한 */
  temperature?: number;   /** 창의력 정도 (0~1쯤, 높을수록 상상 많이) */

  /**
   * model: "gpt-4"
   * stream?: true; 
   *   AI가 답을 생각나는 대로 바로바로 말함 (true) 
   *   AI가 답을 다 생각한 뒤 한꺼번에 말함(false)
   * 
   * maxTokens: 200 
   *   200자 이내로 써라
   * 
   * temperature: 0 → 대답을 정확하게 자료근거로만 
   * temperature: 1 → AI가 상상해서 대답
   */

  /** AI가 부를 수 있는 도구(함수)들 
   *  AI는 주방 요리사이고, tools는 요리 도구(칼, 국자, 믹서기)
   */ 
  tools?: {
    type: "function";
    function: {
      name: string;                           /** 도구 이름 */
      description: string;                    /** 도구 설명 (언제 쓰는지) */
      parameters: { type: string; properties: {} }; /** 도구가 받는 재료(입력)의 모양 */
    }[];
  };

  /**
   * 예: “오늘 서울 날씨 알려줘” → getWeather 도구를 사용해서 답을 줄 수 있음
   * 
   * const options = {
   *   tools: {
   *     type: "function",
   *     function: [
   *       {
   *         name: "getWeather",
   *         description: "원하는 도시의 현재 날씨를 알려줍니다",
   *         parameters: {
   *           type: "object",
   *           properties: {
   *             city: { type: "string" },     // 도시 이름
   *             date: { type: "string" },     // 날짜
   *           },
   *         },
   *       },
   *     ],
   *   },
   * };
   */
}
```

---

## 🤖 AIResponse

```ts
/** AI가 준 답 1개에 대한 정보 */
interface AIResponse {
  index: number;      /** 몇 번째 답인지(0부터) */
  message: {          /** 실제 메시지(누가, 무엇을 말했는지) */
    role: string;                // 누가 말했는지 (user/assistant/system)
    content: string | any[];     // 말한 내용 (글자나 배열)
    refusal: null | string;      /** 안전/정책 때문에 거절한 이유(없으면 null) */
    annotations: any[];          /** 참고 표시(첨부나 근거 같은 메모) */
  };

  logprobs: null | any;          /** 단어별 점수 같은 세부정보(없을 수 있음) */
  finish_reason: string;         /** 왜 멈췄는지("stop", "length" 등) */

  usage: {                       /** 사용량(얼마나 썼는지, 비용 등) */
    type: string;   // 예: "input", "output"
    model: string;  // 사용한 모델 이름
    amount: number; // 사용 토큰 수
    cost: number;   // 유료기능 사용시 부여되는 값을 저장하는변수 (추후사용될걸 고려한) 
  }[];

  /** 외부 AI 서비스(프록시)를 거쳤는지 */
  via_ai_chat_service: boolean;

  /**
   * 예시
   * 
   * AI가 0번째 답을 던져줌 : "안녕하세요! 오늘 기분은 어때요?" 라고 말함 
   * 
   * const response: AIResponse = {
   *   index: 0,
   *   message: {
   *     role: "assistant",
   *     content: "안녕하세요! 오늘 기분은 어때요?",
   *     refusal: null,
   *     annotations: [],
   *   },
   *   logprobs: null,
   *   finish_reason: "stop",
   *   usage: [
   *     { type: "input", model: "gpt-4", amount: 10, cost: 0.001 },
   *     { type: "output", model: "gpt-4", amount: 15, cost: 0.002 },
   *   ],
   *   via_ai_chat_service: false,
   * };
   */
}
```
---

# 2) 왜 썼는지 & 어디에 쓰는지 (한 줄 요약)

* **FileItem**

  * **왜?** 파일/폴더 정보를 깔끔하게 다루려면 “모양”을 정해둬야 함.
  * **어디에?** 파일 목록 보기, 새 파일 만들기, 권한 체크(쓸 수 있나) 같은 화면/기능.

* **SimpleUser**

  * **왜?** “누가 로그인했는지” 알아야 내 것/남의 것을 구분 가능.
  * **어디에?** 상단 프로필, 접근 권한, 내 파일만 보기 등.

* **KeyValue**

  * **왜?** 간단한 설정/메모를 “이름=값”으로 저장하면 찾기 쉬움.
  * **어디에?** 환경설정, 즐겨찾기, 작은 캐시/메모.

* **ChatPiece**

  * **왜?** 채팅은 글자만 보낼 때도 있고, 파일을 보낼 때도 있음 → “조각”으로 통일.
  * **어디에?** 채팅 입력/출력 처리(텍스트 메시지 + 파일 첨부).

* **ChatMessage**

  * **왜?** “사용자/AI/시스템”이 번갈아 말하는 대화를 한 줄에 표현.
  * **어디에?** 채팅 내역 저장/표시/AI에 보내기.

* **ChatOptions**

  * **왜?** “어떤 뇌(모델)를 얼마나 창의적으로 쓸까?” 같은 옵션이 필요.
  * **어디에?** AI 호출 직전 설정(모델, 토큰 제한, 도구 연결).

* **AIResponse**

  * **왜?** AI가 어떻게, 왜 멈췄고, 얼마나 썼는지 등을 알아야 관리 가능.
  * **어디에?** 응답 표시, 비용표시, 디버깅(이상동작 추적), 사용량 기록.

---

# 3) 진짜 상황 비유

* **FileItem** = “파일 카드”: 이름, 어디 있는지 주소, 크기, 주인, 고칠 수 있는지 같은 정보가 적혀 있어요.
* **SimpleUser** = “학생증”: 누군지 딱 알 수 있는 번호와 이름.
* **KeyValue** = “라벨 붙인 서랍”: `라벨(키) → 내용(값)`으로 쏙쏙 찾기.
* **ChatPiece / ChatMessage** = “말풍선”: 글자 말풍선도 있고, 파일 말풍선도 있어요.
* **ChatOptions** = “문제 푸는 방법 설정”: 쉬운 문제집(모델) 쓸지, 창의력 높일지 정함.
* **AIResponse** = “채점표+풀이”: 어떤 답을 했고, 왜 거기서 끝났고, 몇 문제(토큰)를 썼는지.

---

# 4) 작게 굴려보는 예시

```ts
const me: SimpleUser = { id: "u-123", username: "eunhey" };

const photo: FileItem = {
  id: "f-555",
  ownerId: me.id,
  name: "사진.png",
  path: "/내사진/사진.png",
  isFolder: false,
  parentId: "folder-9",
  parentOwnerId: me.id,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  accessedAt: Date.now(),
  size: 1024 * 200, // 200KB
  canWrite: true,
};

const firstMessage: ChatMessage = {
  role: "user",
  content: [{ type: "text", text: "안녕! 내 사진 어때?" }],
};

const secondMessage: ChatMessage = {
  role: "user",
  content: [{ type: "file", filePath: photo.path }],
};

const options: ChatOptions = {
  model: "smart-1",
  temperature: 0.3,
  stream: true,
};
```

---

# 5) 핵심 정리

* 이 파일은 “데이터의 **모양(설명서)**”을 미리 정해두는 **타입 정의** 모음이에요.

