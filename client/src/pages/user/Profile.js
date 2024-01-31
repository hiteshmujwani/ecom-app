import React from 'react'
import UserMenu from '../../components/UserMenu'
import Layout from '../../components/Layout/Layout'
import { useState,useEffect } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Profile() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [phone,setPhone] = useState('')
  const [address,setAddress] = useState('')
  const [auth,setAuth] = useAuth()

  useEffect(()=>{
    setName(auth.user.name)
    setEmail(auth.user.email)
    setPhone(auth.user.phone)
    setAddress(auth.user.address)
  },[])
  const handleSubmit = async (e) =>{
    try {
      e.preventDefault()
      const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-profile`,{name,email,password,phone,address})
      setAuth({...auth,user:res?.data?.updateUser})
      let ls = localStorage.getItem('auth')
      ls = JSON.parse(ls)
      ls.user = res.data.updateUser;
      localStorage.setItem('auth',JSON.stringify(ls))
      toast.success("profile Updated Successfully")
    } catch (error) {
      console.log(error)
      console.log("error in function")
    }
  }

  return (
    <Layout tittle="Create Category - ECOMMERCE APP">
    <div className="container-fluid">
      <div className="row">
         <div className="col-md-3">
          <UserMenu/>
         </div>
         <div className="col-md-3">
         <form className="" onSubmit={handleSubmit}>
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
          <button 
          type="submit" 
          className="btn btn-primary">Update Profile</button>
          </form>
         </div>
      </div>
    </div>
  </Layout>
  )
}
