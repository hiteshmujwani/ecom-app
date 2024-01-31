import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate , useLocation} from 'react-router-dom';
import { useAuth } from '../../context/auth';

export default function Login() {
  let location = useLocation();
    const [auth,setAuth] = useAuth()
    const navigate = useNavigate();
    //states for storing data of user inputs 
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    // form function for sending data on server
    const submitHandler = async (e) =>{
        try {
          e.preventDefault()
          let res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password})
          if(res.data.success){
             setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token
            })
            
            localStorage.setItem('auth',JSON.stringify(res.data))
            navigate(location.state || '/')
          }
          else{
            toast.error("CHECK EMAIL OR PASSWORD")
          }
          
        } catch (error) {
          toast.error("CHECK EMAIL OR PASSWORD")
        }
    }
  return (
    <Layout tittle="Login Page - Ecommerce App">
    <form className="" onSubmit={submitHandler}>
    <input 
    type="email" 
    className="form-control"
    onChange={(e)=>setEmail(e.target.value)}
    value={email}
    placeholder="Enter email"/>
    <input 
    type="password" 
    onChange={(e)=>setPassword(e.target.value)}
    value={password}
    className="form-control"
    placeholder="Password"/>
    <button 
    type="submit" 
    className="btn btn-primary">Login</button>
    <button 
    type="button" 
    className="btn btn-primary m-3"
    onClick={()=>{navigate('/forget-password')}}>Reset Password</button>
    </form>
    </Layout>
  )
}
