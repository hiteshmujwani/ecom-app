import React from 'react'
import { useState,useEffect } from 'react'
import UserMenu from '../../components/UserMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import axios from 'axios'

export default function Orders() {
  const [auth] = useAuth()
  const [orders,setOrders] = useState()

  useEffect(()=>{
    getOrders()
  },[])
  
  const getOrders = async ()=>{
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/get-orders`)
    setOrders(res.data.orders)
  }


  return (
    <Layout tittle="Create Category - ECOMMERCE APP">
    <div className="container-fluid">
      <div className="row">
         <div className="col-md-3">
          <UserMenu/>
         </div>
         <div className="col-md-9">
                  {orders?.map((order,index)=>{
                    return(
                      <div key={index} className='border shadow mb-5'>
                      <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Buyer</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                      
                      <tr>
                        <td>{index + 1}</td>
                        <td>{order.status}</td>
                        <td>{order.buyer.name}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.payment.success ? "success" : "failed"}</td>
                        <td>{order?.products?.length}</td>
                      </tr>
                      </tbody>
              </table>
              {
                order.products.map((product)=>(
                  <div key={Math.random()} className='row'>
     <div className="col-md-6 text-center">
     <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} alt={product?.slug} style={{"height":"300px" , "width":"300px"}}/>
      </div>
      <div className="col-md-6">
        <h4>{product?.name}</h4>
        <h4>{product.description}</h4>
        <h4>Pirce: ${product.price}</h4>
        <h4>Category: {product?.category?.name}</h4>
       
      </div>
    </div>))}
                </div>)})}  
         </div>
      </div>
    </div>
  </Layout>
  )
}
