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
            console.log('called')
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`)
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
            const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,{nonce,cart})
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
            <div className='mt-2'>

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

                <button className="btn btn-primary" onClick={handlePayment}>Make Payment</button>
        </>)}
           
        </div>
        
            </div>
        ):auth.token ? (<button onClick={()=>{navigate('/dashboard/user/profile')}}> Update Address</button>):(<button onClick={()=>{navigate('/login',{state:'/cart'})}}>Please Login</button>)}

       
        
        </div>
    </div>
   </Layout>
  )
}
