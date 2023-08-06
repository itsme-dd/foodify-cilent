import React,{useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart} from '../components/ContextReducer';
export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false)
  const [area, setarea] = useState(false);
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login");

  }
  
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark " style={{backgroundColor:"rgb(28 85 98)"}}>
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 " to="/">
              Foodify
            </Link>
            <button
              className="navbar-toggler collapsed"
              type="button"
              // data-bs-toggle="collapse"
              // data-bs-target=".navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded={area}
              aria-label="Toggle navigation"
              onClick={()=>{
                setarea(!area);
              }}
            
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse navbarSupportedContent ${area===true?"show": ""}`} >
              <ul className="navbar-nav me-auto mb-2">
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                {
                  (localStorage.getItem("authToken"))?
                  <li className="nav-item">
                  <Link className="nav-link fs-5" aria-current="page" to="/myOrder">
                    My Orders
                  </Link>
                </li>
                :""
                }
              </ul>

              {
                (!localStorage.getItem("authToken"))?
                <div className="d-flex">
                <Link className="btn bg-white mx-1" style={{color:"red"}} to="/login">
                  Login
                </Link>
                <Link className="btn bg-white  mx-1" style={{color:"red"}} to="/signup">
                  Signup
                </Link>
              </div>
              :
              <div>
                <div className="btn bg-white  mx-1" style={{color:"#1749b4"}} to="/" onClick={()=>{setCartView(true)}}>
                  My cart {" "}
                  <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {cartView ? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                <div className="btn bg-white  mx-1" style={{color:"red"}} to="/" onClick={handleLogout}>
                Logout
                </div>
              </div>

              }
              

            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
