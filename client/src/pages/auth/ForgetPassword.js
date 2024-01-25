import React from 'react'
import Layout from '../../components/Layout/Layout'
import  { useState } from 'react'
import {toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

export default function ForgetPassword() {
    const navigate = useNavigate();
    //states for storing data of user inputs 
    const [email,setEmail] = useState('')
    const [newpassword,setNewPassword] = useState('')
    const [securitykey,setSecurityKey] = useState('')

    const submitHandler = async (e) =>{
        try {
          e.preventDefault()
          let res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`,{email,newpassword,securitykey})
          if(res.data.success){
            toast.success("PASSWORD RESET SUCCESSFULLY")
            navigate('/login')
          }
          else{
            toast.error("CHECK EMAIL OR SECURITY KEY")
          }
          
        } catch (error) {
          toast.error("CHECK EMAIL OR SECURITY KEY")
        }
    }
  return (
    <Layout tittle={"Reset Password - Ecommerce App"}>
    <form className="" onSubmit={submitHandler}>
    <input 
    type="email" 
    className="form-control"
    onChange={(e)=>setEmail(e.target.value)}
    value={email}
    placeholder="Enter email"/>
    <input 
    type="password" 
    onChange={(e)=>setNewPassword(e.target.value)}
    value={newpassword}
    className="form-control"
    placeholder="enter new Password"/>
    <input 
    type="password" 
    onChange={(e)=>setSecurityKey(e.target.value)}
    value={securitykey}
    className="form-control"
    placeholder="Security Key"/>
    <button 
    type="submit" 
    className="btn btn-primary">Reset</button>
    </form>
    </Layout>
  )
}
