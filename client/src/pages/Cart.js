import React from 'react'
import Layout from '../components/Layout/Layout'
import { useState,useEffect } from 'react'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export const Cart = () => {

    const navigate = useNavigate()
    const [cart,setCart] = useCart()
    const [auth] = useAuth()
    const [instance,setinstance] = useState()
    const [clientToken ,setClientToken] = useState()
    const removeFromCart = (pid) =>{
        const New = cart.filter((item)=>(item._id !== pid))
        setCart(New)
        localStorage.setItem('cart',JSON.stringify(New))
        
    }

    const cartTotal = () =>{
        let total = 0;
        cart.map((item)=>(
            total = total + item.price
        ))
        return total
    }

    //get payment gateway token 
    const getToken = async () =>{
        try {
            const res = await axios.get(`/api/v1/product/braintree/token`)
            setClientToken(res.data.clientToken)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getToken()
    },[auth?.token])


    //handle payment
    const handlePayment = async()=>{
        try {
            const {nonce} = await instance.requestPaymentMethod()
            const {data} = await axios.post(`/api/v1/product/braintree/payment`,{nonce,cart})
            localStorage.removeItem('cart')
            setCart([])
            navigate('/dashboard/user/orders')
            toast.success("order placed successfully")

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout>
    {cart.length > 0 ?(<div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
  <div className="px-4 pt-8">
    <p className="text-xl font-medium">Order Summary</p>
    <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
    
    {/* product */}
    {cart.length > 0 ? (cart.map((p)=>(
        <>
        <div className="flex flex-col rounded-lg bg-white sm:flex-row">
        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.slug} />
        <div className="flex w-full flex-col px-4 py-2 ">

          <p className=" font-semibold">{p.name}</p>
          <span className=" text-gray-400">{p?.description.substring(0,30)}...</span>
          <p className="text-lg font-bold">${p.price}</p>
          <button onClick={()=>{removeFromCart(p._id)}} className="button mt-4 align-self-end flex justify-center text-white font-normal bg-black">REMOVE</button>
          
        </div>
      </div>
      <hr/>
      </>

    ))):("")}
    

{/* product */}

    </div>
    <p className="mt-8 text-lg font-medium">Shipping Methods</p>
    <form className="mt-5 grid gap-6">
      <div className="relative">
        <input className="peer hidden" id="radio_1" type="radio" name="radio" defaultChecked />
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
          <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt />
          <div className="ml-5">
            <span className="mt-2 font-semibold">Fedex Delivery</span>
            <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
          </div>
        </label>
      </div>
      <div className="relative">
        <input className="peer hidden" id="radio_2" type="radio" name="radio" defaultChecked />
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
          <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt />
          <div className="ml-5">
            <span className="mt-2 font-semibold">Fedex Delivery</span>
            <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
          </div>
        </label>
      </div>
    </form>
  </div>
  <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
    <p className="text-xl font-medium">Payment Details</p>
    <p className="text-gray-400">Complete your order by providing your payment details.</p>
    <div className="mt-5">
      <div className="flex flex-col sm:flex-row ">
        <div className="relative flex-shrink-0 sm:w-11/12">
        {auth?.user?.address ? (
            <>
            {!clientToken || !cart?.length ? (""):(<>
            <DropIn
            options={{
                authorization:clientToken,
                paypal:{
                    flow:'vault'
                },
                
            }
        
            }
            onInstance={(instance)=>{setinstance(instance)}}/>

        </>)}
       </>):("")}
        </div>
      </div>
      {/* Total */}
      <div className="mt-6 border-t flex flex-col gap-2 border-b py-3">
        <div className="flex items-center justify-between ">
          <p className="text-sm font-medium text-gray-900">Subtotal</p>
          <p className="font-semibold text-gray-900">${cartTotal()}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Shipping</p>
          <p className="font-semibold text-gray-900 line-through">FREE</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">${cartTotal()}</p>
      </div>
    </div>
   {auth.token ? (auth?.user?.address ? (<button className="mt-4  w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" onClick={()=>{navigate('/dashboard/user/profile')}}> Update Address</button>):(<button className="mt-4  w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" onClick={()=>{navigate('/dashboard/user/profile')}}>Add Shipping Address</button>)) :("")}
   {auth.token ? (<button onClick={handlePayment} className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>):(<button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" onClick={()=>{navigate('/login',{state:'/cart'})}}>Please Login</button>)}
  </div>
</div>):(<div style={{"height":"80vh"}} className="flex flex-col gap-5 justify-center align-items-center">
    <h1 className="text-6xl font-bold">🛒 Your Cart Is Empty 🛒</h1>
    <button className="button bg-black text-white text-2xl font-bold w-25 flex justify-center p-10" onClick={()=>{navigate('/home')}}>Add Some Products</button>
</div>)}
      

    </Layout>
  )
}
