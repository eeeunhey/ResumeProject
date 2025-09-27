import { Link } from "react-router";


const Navbar = () => {
  return (
    <div className="navbar">
        <Link to="/">
            <p className="text-2xl font-bold text-gradient"> Ascend </p>
        </Link>
        <Link to="/upload" className="primary-button w-fit">
          이력서 업로드
        </Link>
    </div>
  )
}

export default Navbar