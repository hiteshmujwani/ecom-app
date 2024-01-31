import React from 'react'
import axios from 'axios'
import { useNavigate,NavLink } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
function CategoryProducts() {
    const [cart,setCart] = useCart()
    const navigate = useNavigate()
    const params = useParams()
    const [products,setProducts] = useState([])

    //get single category products
    const getCategoryProduct = async () =>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/category-product/${params.slug}`)
        setProducts(res.data?.product)
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
     if(params.slug) getCategoryProduct()
    },[params])
   
  return (
    <Layout>
       <div className="col-md-10 d-flex flex-wrap justify-content-center align-items-center gap-3">
      {products ? products.map((p)=>(
                        <div key={p._id} className="card" style={{width: '18rem'}}>
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.slug} />
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0,30)}...</p>
                            <p className="card-text">{p.category.name}</p>
                            <p className="text-danger">$ {p.price}</p>
                            <button className="btn btn-primary ms-2" onClick={()=>{navigate(`/product-details/${p.slug}`)}}>More Details</button>
                            <button onClick={()=>{setCart([...cart,p]); localStorage.setItem('cart',JSON.stringify([...cart,p]))}} className="btn btn-danger ms-2">Add To Cart</button>
                        </div>
                        </div>
                ))
                    :"no products"
                }
               
                </div>
    </Layout>
    
  )
}

export default CategoryProducts