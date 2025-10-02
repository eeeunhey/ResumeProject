routes.ts 파일 수정하기
1. import  {type route }를 추가한다 아래는 수정 코드이다
```ts
    import { type RouteConfig, index , route} from "@react-router/dev/routes"; 
```
2. default 내부에 호출할 route 정보를 추가한다
 route('/접속이름','실제경로'), 추가하면 된다
 아래코드와 같이 수정하면 된다

```ts
export default [
    index("routes/home.tsx"),
    route('/auth', 'routes/auth.tsx'),
] satisfies RouteConfig;
```


http://localhost/5173/auth 로 가기 위해 위와 같은 설정이 필요하다 설정을 등록하면 위 주소로 접속이 가능하다


# routes/auth.tsx 구현하기

### 페이지 탭 정보를 보여주기 위한 코드
```ts
    export const meta = () => ([
        {title: 'Ascend | Auth'},
        {name: '설명', content:'대충 내용 설명'}
    ])
```

### 버튼 띄우기

```ts
<main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center ">
```
    1. <main> 메인 콘텐츠를 의미하는 태그
    2. bg-[url('/images/bg-auth.svg')] Tailwindcss에 임의 값을 넣으려면 `[]` 쓰면된다
    해당 파일을 배경으로 하기 위해 사용했다
    3. bg-corver : 배경 이미지 비율 유지 화면 채우기
    4. min-h-screen: 최소 높이를 브라우저 화면 만큼 준다 -> 작아져도 화면이 전체를 채운다
    5. flex items-center justify-center
        item- 새로정렬
        justify 가로정렬
        -> 정가운데 배치된다
    