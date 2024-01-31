import React from 'react'
import Layout from '../components/Layout/Layout'
import { useState } from 'react'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { token } from 'morgan'
import { useNavigate } from 'react-router-dom'
export const Cart = () => {
    const navigate = useNavigate()
    const [cart,setCart] = useCart()
    const [auth,setAuth] = useAuth()
    const removeFromCart = (pid) =>{
        const New = cart.filter((item)=>(item._id != pid))
        setCart(New)
        localStorage.setItem('cart',JSON.stringify(New))
        
    }

    const cartTotal = () =>{
        let total = 0;
        cart.map((item)=>{
            total = total + item.price;
        })
        return total
    }
  return (
   <Layout>
    <div className="row">
        <div className='col-md-8'>
            {
                cart.length > 0 ? (
                    cart.map((p)=>(
                        <div className="w-75 d-flex flex-row p-2 m-5 gap-5">
                        <img height={200} src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.slug} />
                        <div className="d-flex flex-column w-100">
                            <h5>Name: {p.name}</h5>
                            <h5>price: {p.price}</h5>
                            <h5>price: {p.description}</h5>
                            <button className='btn btn-danger mt-5' onClick={()=>{removeFromCart(p._id)}}>Remove</button>
                        </div>
                        </div>
                        
                    ))
                ):"Your Cart Is Empty !! Please Add Some Products !"
            }
        </div>
        <div className='col-md-4 text-center gap-1'>
            <h3>Cart Summary</h3>
            <p>Total | CheckOut | Payment</p>
            <hr/>
            <h1>Total : {cartTotal()}</h1>
            <hr/>
            {auth?.user?.address ? (
            <div className="text-center">
            <h4>Current address :- {auth.user.address}</h4>
            <button onClick={()=>{navigate('/dashboard/user/profile')}}>Update Address</button>
            </div>
        ):auth.token ? (<button onClick={()=>{navigate('/dashboard/user/profile')}}> Update Address</button>):(<button onClick={()=>{navigate('/login',{state:'/cart'})}}>Please Login</button>)}
        </div>
        
    </div>
   </Layout>
  )
}
