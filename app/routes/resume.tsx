import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
export const meta = () => [
  { title: "Resumind | Review" },
  { name: "description", content: "이력서를 기반으로 한 상세 요약입니다 " },
];

const resume = () => {
  const {auth, isLoading, fs, kv} = usePuterStore();
  const { id } = useParams();

  useEffect(() => {
    const loadResume= async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;
      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if(!resumeBlob) return;

    }
  } , [id]);

  return <main className="!pt-0">
    <nav className="resume-nav">
        <Link to="/" className="back-button">
        <img src="/icons/back.svg" alt="logo" className="w-2.5, h-2.5"/>
        <span className=" text-gray-800 text-sm font-semibold">Home</span>
        </Link>
    </nav>
    {/* 모바일 */}
    <div className="flex flex-row w-full max-lg:flex-col-reverse">
      {/* anmation-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit */}
        <section className="feedback-section">
          {/* {imageUrl && resumeUrl &&(
            <div className="anmation-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">

            </div>
          )} */}
        </section>
       </div>

  </main>;
};

export default resume;
