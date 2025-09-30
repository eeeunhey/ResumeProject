



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