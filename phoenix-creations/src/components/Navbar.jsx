import { Link } from "react-router-dom";
const Navbar=()=>{
return <div>
    <ul className="nav justify-content-center">
  <li className="nav-item">
    <Link className="nav-link" to="/home">Home</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/about">About</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/">Products</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/" >More</Link>
  </li>
</ul>
</div>
}

export default Navbar;