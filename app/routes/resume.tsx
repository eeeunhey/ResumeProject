import { useParams } from "react-router";
import { Link } from "react-router";
export const meta = () => [
  { title: "Resumind | Review" },
  { name: "description", content: "이력서를 기반으로 한 상세 요약입니다 " },
];

const resume = () => {
  const { id } = useParams();

  return <main className="!pt-0">
    <nav className="resume-nav">
        <Link to="/" className="back-button">
        </Link>
    </nav>

  </main>;
};

export default resume;
