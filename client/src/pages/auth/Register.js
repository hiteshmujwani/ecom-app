import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    //states for storing data of user inputs 
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const [securitykey , setSecurityKey] = useState('')
    

    // form function for sending data on server
    const submitHandler = async (e) =>{
        try {
          e.preventDefault()
          let res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,securitykey})
          if(res.data.success){
            toast.success(res.data.message)
            navigate('/login')
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
    type="text" 
    className="form-control"
    onChange={(e)=>setName(e.target.value)}
    value={name}
    placeholder="Enter Full Name"/>
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
    <input 
    type="text" 
    className="form-control"
    onChange={(e)=>setPhone(e.target.value)}
    value={phone}
    placeholder="Enter Your Phone Number"/>
    <input 
    type="text" 
    className="form-control"
    onChange={(e)=>setAddress(e.target.value)}
    value={address}
    placeholder="Enter Your Address"/>
    <input 
    type="text" 
    className="form-control"
    onChange={(e)=>setSecurityKey(e.target.value)}
    value={securitykey}
    placeholder="Enter Your Security Key"/>
    <button 
    type="submit" 
    className="btn btn-primary">Submit</button>
    </form>
    </Layout>
  )
}
