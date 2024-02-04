import React,{useState,useEffect} from "react";
import Layout from '../../components/Layout/Layout.js'
import AdminMenu from "../../components/AdminMenu.js";
import { useAuth } from "../../context/auth.js";
import axios from "axios";

export const AllOrders = () => {
  const [auth] = useAuth()
  const [orders,setOrders] = useState()
  const [status,setstatus]= useState(["not confirmed","order Confirmed","shipped","out for delivery","cancel","delivered"])

  useEffect(()=>{
    getOrders()
  },[ ])

  const getOrders = async ()=>{
    const res = await axios.get(`/api/v1/auth/all-orders`)
    setOrders(res.data.orders)
  }

  const handleStatus = async (oid,value) =>{
   try {
    const res = await axios.put(`/api/v1/auth/change-status/${oid}`,{"status":value})
    getOrders()
   } catch (error) {
    console.log(error)
   }
  }


  return (
    <Layout tittle="All Users - ECOMMERCE APP">
    <div className="container-fluid">
      <div className="row">
         <div className="col-md-3">
          <AdminMenu/>
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
                        <td><select onChange={(e)=>{handleStatus(order._id,e.target.value)}} defaultValue={order.status}>{status.map((status,index)=>(<option key={index} value={status}>{status}</option>))}</select></td>
                        <td>{order.buyer.name}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.payment.success ? "success" : "failed"}</td>
                        <td>{order?.products?.length}</td>
                      </tr>
                      </tbody>
              </table>
              {
                order.products.map((product)=>(
                  <div key={Math.random()} className='row m-3'>
     <div className="col-md-2 text-center object-contain" style={{"height":"150px","width":"150px"}}>
     <img src={`/api/v1/product/product-photo/${product._id}`} alt={product?.slug}/>
      </div>
      <div className="col-md-4 flex flex-column gap-2 text-xl font-light">
        <h4><span className="font-bold">Product Name:- </span>{product?.name}</h4>
        <h4><span className="font-bold">Product description:- </span>{product.description.substring(0,50)}...</h4>
        <h4><span className="font-bold">Product Price:- </span>${product.price}</h4>
      </div>
      <hr/>
    </div>
    ))}
                </div>)})}


         </div>
      </div>
    </div>
  </Layout>
  )
};
