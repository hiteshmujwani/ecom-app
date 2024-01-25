import React from 'react'
import {NavLink,Link} from 'react-router-dom'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'

export default function Header() {
  const [auth,setAuth] = useAuth()
  const handleLogout = () =>{
    setAuth({
      user:null,
      token:""})
      localStorage.removeItem('auth')
      toast.success("LOGOUT SUCCESSFULLY")
  }
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">ECOMMERCE APP</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/Category">Category</NavLink>
        </li>
        {
          (auth.user == null) ? (<><li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/register">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink>
        </li></>) 
        :
         (<>
          <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    {auth.user.name}
  </NavLink>
  <ul className="dropdown-menu">
    <li><NavLink className="dropdown-item" to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}>Dashboard</NavLink></li>
    <li><NavLink className="dropdown-item" onClick={handleLogout} aria-current="page" to="/login">Logout</NavLink></li>
  </ul>
</li>
        </>)
        }
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/cart">Cart(0)</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
