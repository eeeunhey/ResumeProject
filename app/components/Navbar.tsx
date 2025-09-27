import { Link } from "react-router";


const Navbar = () => {
  return (
    <div className="navbar">
        <Link to="/">
            <p className="text-2xl font-bold text-gradient"> Ascend </p>
        </Link>
    </div>
  )
}

export default Navbar