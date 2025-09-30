
<details> 
<summary>
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
        <script src="https://js.puter.com/v2/"></script>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


```

        <script src="https://js.puter.com/v2/"></script> 
        추가한다


app/lib/puter.ts 를 만든다
타입을 지정할 .react-router/types/puter.d.ts 생성

```ts

declare global { // 어디서든 꺼내쓰는 함수 모음집
  interface Window { // Window.puter 호출 예정임
    puter: {
      auth: { Window.puter   
        getUser: () => Promise<PuterUser>; 
        /**
         * const getUserInfo = async () => {
              const user = await window.puter.auth.getUser();
              console.log("사용자:", user);
            };
         * getUserInfo();
          예시 출력: 사용자: { uuid: "u-123", username: "은혜" } 
        */

        isSignedIn: () => Promise<boolean>; 
        /**
         *  지금 로그인 상태인지 확인
         * const checkLogin = async () => {
         *  const signedIn = await Window.puter.auth.isSignedIn();
         *  console.log("로그인 상태:", signedIn); 
         * }
         * checkLogin();
         * 호출했을 때 결과 : 로그인 상태: true 를 반환
         * 
        */

        signIn: () => Promise<void>; 
        /**
         * const login = async () => {
         *  await Window.puter.auth.signIn();
         *  console.log("로그인 완료!!!");
         * };
         * login();
         * 출력결과 : 로그인창이 뜨고 성공했을 때 로그인 완료 출력
        */
        
        signOut: () => Promise<void>;
        /**
         *  const logout = async () => {
         *    await Window.puter.auth.signOut();
         *    console.log("로그아웃 완료!");
         * };
         * logout();
         * 출력결과 : 로그 아웃 완료! 
        */

      };

```

```ts
      fs: { //파일 시스템(fs) 관련 기능을 모아놈 사물함에 새 노트 꽂기
        write: ( 
          path: string,
          data: string | File | Blob
        /** 
         * 특정 경로(path)에 파일을 새로 쓰거나 저장.
         * data는 문자열, 파일 객체, Blob 가능.
         * 예시: fs.write("/memo.txt", "안녕하세요")
         * 결과: /memo.txt 파일이 만들어지고 내용은 "안녕하세요".
        */

        ) => Promise<File | undefined>;
          // Promise<T> 타입이 붙은 이유: → 결과가 나중에 도착하니까(async 동작)
          // await를 붙여 써야 안전하게 결과를 받을 수 있어요.

        read: (path: string) => Promise<Blob>;
        /** 사물함에서 노트 꺼내 읽기
         * read : 파일을 읽어옴.
         * 반환 타입이 Promise<Blob> → 파일 조각 데이터
         * 
         * const blob = await fs.read("/memo.txt");
         * console.log(blob);
         * 출력값 : Blob {size: 12, type:"text/plain"}
         * Blob은 크기(size)와 타입(type)을 스스로 가지고 있음
         * read가 Blob을 반환하는 이유 → 파일을 다루는 웹 표준 통일 타입
         * 봉투 바깥에 **라벨(size, type)**이 붙어 있어서, 안 열어봐도 대략 뭔지 알 수 있음
         * Blob은 그냥 덩어리라서, 텍스트/이미지/다운로드 등 용도에 맞게 변환해서 써야 함
        */

        upload: (file: File[] | Blob[]) => Promise<FSItem>; //puter.d.ts에 타입정의해놈 
        /** 집에서 가져온 파일을 사물함에 올리기
         * upload : 사용자가 선택한 파일(브라우저 File 객체)이나 Blob을 Puter에 업로드.
         * const fileInput = document.querySelector("input[type=file]");
         * const uploaded = await fs.upload(fileInput.files);
         * console.log(uploaded); // 업로드된 FSItem 정보
         * **업로드된 파일의 상세 정보(FSItem)**를 돌려줌
         *  "id": "f_12345",
            "uid": "u_67890", name, 그 아래 정의 타입의 값을 반환
         * 
        */
        delete: (path: string) => Promise<void>;
        /** path라는 주소를 받아서, 해당 위치에 있는 파일/폴더를 지워요. 
         * 끝났다는 신호만 주고, 따로 값은 안 돌려줌 Promise<void>인 이유
         * awite fs.delete("/내문서/memo.txt");
         * console.log("memo.txt 삭제 완료");
         * 출력값 : memo.txt 삭제 완료!
         * 
        */

        readdir: (path: string) => Promise<FSItem[] | undefined>;

        /** 사물함 안에 뭐가 있는지 목록 확인하기
         * 
         * readdir(path) 는 path 위치(폴더 경로)를 주면
         * → 그 안에 있는 파일/폴더 리스트를 FSItem[] 배열로 돌려줘요.
         *   실패하거나 없는 경로라면 undefined가 될 수 있음.
         *  const items = awit fs.readdir("/내문서");
         *  console.log(items);
        */
      };


```


```ts
// Puter 안에서 AI 채팅이나 이미지 → 텍스트 변환 같은 기능

      ai: {
        chat: ( // AI와 대화하는 함수
          prompt: string | ChatMessage[],            // 질문[문자열 또는], ChatMessage[]여러 프롬프트 넣음
          imageURL?: string | PuterChatOptions, // 이미지 주소나 옵션 (선택)
          testMode?: boolean,                   // 테스트 모드 여부
          options?: PuterChatOptions            // 모델 설정 (예: 모델 종류, 온도, 최대 토큰 등)
        ) => Promise<Object>;                   // AI가 생성한 답변이 객체 형태로 옴 (예: 응답 메시지, 메타데이터 등)
          /**
           * const res = await fs.ai.chat("안녕? 오늘 날씨 어때?");
           * console.log(res);
           * 
           * Json 형식으로 반환
           * {
                  "message": "안녕하세요! 오늘은 맑고 기분 좋은 날씨네요 🌞"
              }
           * 
          */

        img2txt: (
          image: string | File | Blob, //이미지 파일, Blob, 혹은 파일 경로
          testMode?: boolean           // 테스트 모드 여부
        ) => Promise<string>;          // Promise<string> → 이미지 설명 문자열

        /**
         * const caption = await fs.ai.img2txt("/사진/고양이.png);
         * console.log(caption);
         * 출력 : "귀여운 회색 고양이가 소파 위에 앉아 있습니다." 반환
        */
      };

        kv: {
          get: (key: string) => Promise<string | null>;
            /**
             *  get(key) key(이름)에 저장된 값을 가져오기. 없으면 null값
             *  await kv.set("nickname", "쿼카");
             *  const name = await kv.get("nickname");
             *  console.log(name); 
             *  출력값 : "쿼카"
             * 
            */
          set: (key: string, value: string) => Promise<boolean>;
          /** 새로운 값 저장하기 (덮어쓰기 가능).
           * set(key, value)
           * const ok = await kv.set("theme", "dark");
           * console.log(ok);
           * 결과값: true
          */

          delete: (key: string) => Promise<boolean>;
          /**
           * 특정 key를 지움.
           * const ok = await kv.delete("theme");
           * console.log(ok);
           * 출력값 : true
          */

          list: (pattern: string, returnValues?: boolean) => Promise<string[]>;
          /**
           * 특정 패턴에 맞는 key 목록을 배열로 반환
           * returnValues를 true -> key 값만 반환
           * 
           * await kv.set("nickname", "쿼카");
           * await kv.set("theme", "dark");
           * 
           * const key = await kv.list("*");
           * console.log(keys) 
           * 출력값 : ["nickname", "them"] 키값만 출력한다
          */


          flush: () => Promise<boolean>;
          /**
           * 전체 key-value 데이터 싹 다 삭제.
           * await kv.flush();
           * const keys = await kv.list("*");
           * console.log(keys); []
           * 
          */
      };


</summary>
</details>


# 📂 Window.puter.fs

파일 시스템 관련 기능 (읽기, 쓰기, 업로드, 삭제, 목록 조회)을 제공합니다.

---

## 📌 write

```ts
write: (path: string, data: string | File | Blob) => Promise<File | undefined>;
```

특정 경로에 파일을 새로 쓰거나 저장합니다.

**예시**

```ts
const file = await window.puter.fs.write("/memo.txt", "안녕하세요");
console.log(file);
```

**출력**

```
/memo.txt 파일이 만들어지고 내용은 "안녕하세요".
```

---

## 📌 read

```ts
read: (path: string) => Promise<Blob>;
```

파일을 읽어 Blob 객체로 반환합니다.

**예시**

```ts
const blob = await window.puter.fs.read("/memo.txt");
console.log(blob);
```

**출력**

```
Blob { size: 12, type: "text/plain" }
```

👉 Blob은 파일 데이터를 담은 "덩어리"이며, size/type 같은 정보가 자동으로 붙습니다.

---

## 📌 upload

```ts
upload: (file: File[] | Blob[]) => Promise<FSItem>;
```

사용자가 선택한 파일(또는 Blob)을 업로드합니다.

**예시**

```ts
const fileInput = document.querySelector("input[type=file]");
const uploaded = await window.puter.fs.upload(fileInput.files);
console.log(uploaded);
```

**출력 (FSItem 예시)**

```json
{
  "id": "f_12345",
  "uid": "u_67890",
  "name": "resume.pdf",
  "path": "/내문서/resume.pdf",
  "is_dir": false,
  "size": 204800,
  "writable": true
}
```

---

## 📌 delete

```ts
delete: (path: string) => Promise<void>;
```

지정한 경로의 파일/폴더를 삭제합니다.

**예시**

```ts
await window.puter.fs.delete("/내문서/memo.txt");
console.log("memo.txt 삭제 완료!");
```

**출력**

```
memo.txt 삭제 완료!
```

---

## 📌 readdir

```ts
readdir: (path: string) => Promise<FSItem[] | undefined>;
```

폴더 안에 있는 파일/폴더 목록을 반환합니다.

**예시**

```ts
const items = await window.puter.fs.readdir("/내문서");
console.log(items);
```

**출력**

```json
[
  { "name": "memo.txt", "is_dir": false },
  { "name": "photos", "is_dir": true }
]
```

---

# 🤖 Window.puter.ai

AI 채팅 및 이미지 → 텍스트 변환 기능을 제공합니다.

---

## 📌 chat

```ts
chat: (
  prompt: string | ChatMessage[],
  imageURL?: string | PuterChatOptions,
  testMode?: boolean,
  options?: PuterChatOptions
) => Promise<Object>;
```

AI와 대화를 합니다.

**예시**

```ts
const res = await window.puter.ai.chat("안녕? 오늘 날씨 어때?");
console.log(res);
```

**출력**

```json
{
  "message": "안녕하세요! 오늘은 맑고 기분 좋은 날씨네요 🌞"
}
```

---

## 📌 img2txt

```ts
img2txt: (image: string | File | Blob, testMode?: boolean) => Promise<string>;
```

이미지 내용을 텍스트 설명으로 변환합니다.

**예시**

```ts
const caption = await window.puter.ai.img2txt("/사진/고양이.png");
console.log(caption);
```

**출력**

```
"귀여운 회색 고양이가 소파 위에 앉아 있습니다."
```

---

# 📝 Window.puter.kv

간단한 Key-Value 저장소 기능을 제공합니다. (작은 메모장처럼 사용)

---

## 📌 get

```ts
get: (key: string) => Promise<string | null>;
```

특정 key의 값을 가져옵니다.

**예시**

```ts
await window.puter.kv.set("nickname", "쿼카");
const name = await window.puter.kv.get("nickname");
console.log(name);
```

**출력**

```
"쿼카"
```

---

## 📌 set

```ts
set: (key: string, value: string) => Promise<boolean>;
```

key에 새로운 값을 저장합니다. (덮어쓰기 가능)

**예시**

```ts
const ok = await window.puter.kv.set("theme", "dark");
console.log(ok);
```

**출력**

```
true
```

---

## 📌 delete

```ts
delete: (key: string) => Promise<boolean>;
```

특정 key를 삭제합니다.

**예시**

```ts
const ok = await window.puter.kv.delete("theme");
console.log(ok);
```

**출력**

```
true
```

---

## 📌 list

```ts
list: (pattern: string, returnValues?: boolean) => Promise<string[]>;
```

저장된 key 목록을 반환합니다.

**예시**

```ts
await window.puter.kv.set("nickname", "쿼카");
await window.puter.kv.set("theme", "dark");

const keys = await window.puter.kv.list("*");
console.log(keys);
```

**출력**

```
["nickname", "theme"]
```

---

## 📌 flush

```ts
flush: () => Promise<boolean>;
```

모든 key-value 데이터를 삭제합니다.

**예시**

```ts
await window.puter.kv.flush();
const keys = await window.puter.kv.list("*");
console.log(keys);
```

**출력**

```
[]
```

---

✅ 이제 `auth`, `fs`, `ai`, `kv` 전부 같은 포맷으로 문서화가 끝났습니다.
👉 원하시나요? 제가 이걸 바로 `README.md` 형식 템플릿으로 합쳐서, 프로젝트에 복붙 가능한 버전으로 만들어드릴까요?
