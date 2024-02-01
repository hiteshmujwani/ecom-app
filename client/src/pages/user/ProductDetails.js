import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Layout from '../../components/Layout/Layout'
import { useCart } from '../../context/cart'

export const ProductDetails = () => {
  const [cart,setCart] = useCart()
const params = useParams()
const [product,setProduct] = useState({})




  //get Product Details 
  const getProductDetails = async() =>{
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
      setProduct(res.data.product)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    getProductDetails()
    //eslint-disbale-next-line
    },[])
    
  

 
  return (
   <Layout>
    <div className='row'>
      <div className="col-md-6 text-center">
        {product ?( <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} alt={product?.slug} style={{"height":"300px" , "width":"300px"}}/>):""}
      </div>
      <div className="col-md-6">
        <h4>{product?.name}</h4>
        <h4>{product.description}</h4>
        <h4>Pirce: ${product.price}</h4>
        <h4>Category: {product?.category?.name}</h4>
        <button onClick={()=>{setCart([...cart,product]); localStorage.setItem('cart',JSON.stringify([...cart,product]))}} className="btn btn-danger">Add to Cart</button>
      </div>
    </div>
    <hr></hr>
    {/* <div className="col-md-12">
      <h1 className='text-center'>Related Products</h1>
      {related.length < 1 ? related.map((p)=>(
                        <div className="card" style={{width: '18rem'}}>
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.slug} />
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0,30)}...</p>
                            <p className="card-text">{p.category.name}</p>
                            <p className="text-danger">$ {p.price}</p>
                            <button className="btn btn-primary ms-2" onClick={()=>{navigate(`/product-details/${p.slug}`)}}>More Details</button>
                            <button className="btn btn-danger ms-2">Add To Cart</button>
                        </div>
                        </div>
                ))
                    :"no products"
                }
    </div> */}
   </Layout>
  )
}
