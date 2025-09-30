



```
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
         * 왜 블랍을 반환하지? / size type은 지정해놓지 않았는데 어떻게 가져와?
        */

        upload: (file: File[] | Blob[]) => Promise<FSItem>;
        /** 집에서 가져온 파일을 사물함에 올리기
         * upload : 사용자가 선택한 파일(브라우저 File 객체)이나 Blob을 Puter에 업로드.
         * const fileInput = document.querySelector("input[type=file]");
         * const uploaded = await fs.upload(fileInput.files);
         * console.log(uploaded); // 업로드된 FSItem 정보
         * 
         * 
        */
        delete: (path: string) => Promise<void>;
        /** 사물함에서 노트 빼고 버리기
         * 
         * 
        */

        readdir: (path: string) => Promise<FSItem[] | undefined>;

        /** 사물함 안에 뭐가 있는지 목록 확인하기
         * 
         * 
        */
      };


```