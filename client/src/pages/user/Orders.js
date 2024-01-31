import React from 'react'
import { useState,useEffect } from 'react'
import UserMenu from '../../components/UserMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import axios from 'axios'

export default function Orders() {
  const [auth] = useAuth()
  const [orders,setOrders] = useState()

  const getOrders = async ()=>{
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/get-orders`)
    setOrders(res.data.orders)
  }

  useEffect(()=>{
    if(auth?.token) getOrders()
  },[auth?.token])
  return (
    <Layout tittle="Create Category - ECOMMERCE APP">
    <div className="container-fluid">
      <div className="row">
         <div className="col-md-3">
          <UserMenu/>
         </div>
         <div className="col-md-3">
          {JSON.stringify(orders,null,4)}
         </div>
      </div>
    </div>
  </Layout>
  )
}
