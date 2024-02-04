import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { SearchInput } from "../Form/SearchInput";
import useCategory from "../../utils/useCategory.js";
import { useCart } from "../../context/cart.js";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import image from '../images/icons8-shopping-cart-60.png'
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search.js";
import axios from "axios";
import '../../styles/Header.css'

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const Header = () => {
  const [cart] = useCart();
  const categories = useCategory();
  const [auth, setAuth] = useAuth();
  const [value,setValue] = useSearch()
    const navigate = useNavigate()

    const handleSearch = async (e) =>{
        try {
            e.preventDefault()
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${value.keyword}`)
            setValue({...value,results:res.data})
            navigate('/search')
        
        } catch (error) {
            console.log("error in searching product" + error)
        }
    }


  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("LOGOUT SUCCESSFULLY");
  };
  return (
    <header className="text-gray-900 body-font border-b-2">
      <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
        <Link to={'/'} className="flex title-font text-3xl items-center text-gray-900  md:mb-0">
          <img src={image}/>
          <span className="ml-3 font-black text-xxl">ECOMMERCE</span>
        </Link>

        <Link className=" ms-auto"><div className="input-container">
  <input type="text" name="text" required className="input" onChange={(e)=>{setValue({...value,keyword:e.target.value})}} placeholder="search..." />
  <span className="icon" onClick={(e)=>{handleSearch(e)}}> 
    <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path opacity={1} d="M14 5H20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path opacity={1} d="M14 8H17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /> <path opacity={1} d="M22 22L20 20" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /> </g></svg>
  </span>
</div>


</Link>

        <nav className="md:ml-auto flex flex-wrap items-center gap-4 text-base font-bold justify-center">
          <NavLink to={"/home"} className=" hover:text-gray-900">
            HOME
          </NavLink>
          {auth.user == null ? (
            <>
              <Link className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/register"
                >
                  REGISTER
                </NavLink>
              </Link>
              <Link className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  LOGIN
                </NavLink>
              </Link>
            </>
          ) : (
            <>
              <Link className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hello {auth.user.name.substring(0,7)}..
                </NavLink>
                <ul className="dropdown-menu">
                  <Link>
                    <NavLink
                      className="dropdown-item"
                      to={`/dashboard/${
                        auth.user.role === 1 ? "admin" : "user"
                      }`}
                    >
                      DASHBOARD
                    </NavLink>
                  </Link>
                  <Link>
                    <NavLink
                      className="dropdown-item"
                      onClick={handleLogout}
                      aria-current="page"
                      to="/login"
                    >
                      LOGOUT
                    </NavLink>
                  </Link>
                </ul>
              </Link>
            </>
          )}
         
          <Link className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              CATEGORY
            </Link>
            <ul className="dropdown-menu">
              {categories?.map((c) => (
                <li key={c._id}>
                  <Link
                    className="dropdown-item font-medium"
                    to={`/category/${c.slug}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Link>

          <Link to={"/cart"}>
            <IconButton aria-label="cart" color="inherit">
              <StyledBadge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </nav>
      </div>
    </header>
  );
};
