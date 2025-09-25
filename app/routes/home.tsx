import type { Route } from "./+types/home";
// 타입을 가져오는데 라우트라는 타입 설명서만 가져온다
// ./+types/home : home.tsx 라는 라우트 파일이 있으면 거기에 맞춰서 생성된다함
// import 대신 import type을 쓰면 타입만 가져와서 실행 코드에서는 사라짐
// 왜 type으로 가져올까? : 어떤 데이터가 있는지에 대해 안내해준다
// 

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <main>
    <section className="main-section">
      <div className="page-heading">
        <h1> 지원 내역과 이력서 평가 결과를 쉽게 확인하고 관리할 수 있습니다 </h1>
      </div>
    </section>
  </main>;
}
