import { resumes } from "~/constants";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";

// 타입을 가져오는데 라우트라는 타입 설명서만 가져온다
// ./+types/home : home.tsx 라는 라우트 파일이 있으면 거기에 맞춰서 생성된다함
// import 대신 import type을 쓰면 타입만 가져와서 실행 코드에서는 사라짐
// 왜 type으로 가져올까? : 어떤 데이터가 있는지에 대해 안내해준다
//

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NextArc" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1>Ascend — 나의 커리어 흐름을 다음 단계로</h1>
          <h2>
            지원 기록을 한눈에 정리하고,
            <br />
            AI 맞춤 피드백으로 더 나은 준비를 시작하세요
          </h2>
        </div>
      </section>

    {resumes.length > 0 && (
      <div className="resumes-section">
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    )}


    </main>
  );
}
