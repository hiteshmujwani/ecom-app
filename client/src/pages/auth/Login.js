import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
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
            toast.success(res.data.message)
            navigate('/')
          }
          else{
            toast.warning(res.data.message)
          }
        } catch (error) {
          toast.error("something wrong")
        }
    }
  return (
    <Layout tittle="Register Page - Ecommerce App">
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
    </form>
    </Layout>
  )
}
