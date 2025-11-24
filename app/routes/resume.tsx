import { C } from "node_modules/react-router/dist/development/index-react-server-client-2EDmGlsZ.mjs";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";

// 페이지 제목 설명을 설정
const meta = () => {
  [
    { title: "Resumind | Review" },
    { name: "desciption", content: "이력서 기반으로 한 상세 요약입니다." },
  ];
};

const resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const loadResume = async() => {
      const resuem = await kv.get(`resume:${id}`);
    };
  }, [id]);

  return (
    <main className="!pt-0">
      <nav className="reseum-nav">
        <Link to="/" className="back-button">
          <img src="/images/icon-back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 font-semibold">뒤로가기</span>
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section>
          {imageUrl && resumeUrl && (
            <div className="feedback-section animate-in fade-in duration-100 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit"></div>
          )}
        </section>
      </div>
    </main>
  );
};

export default resume;
