import React from 'react'
import Layout from '../../components/Layout/Layout'
import {useState,useEffect} from 'react'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios'
import { Link, NavLink } from 'react-router-dom'

export const Products = () => {
    const [products,setProducts] = useState()

    //getting all products 
    const allProducts = async () =>{
        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-all-products`)
        setProducts(res.data?.products)
    }

    //useEffect for calling function when this components render
    useEffect(() => {
        allProducts()
    }, [])
    
  return (
    <Layout>
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1 className='text-center'>All Products List</h1>
                <div className="d-flex flex-wrap gap-4 align-items-center justify-content-center">
                {products ? products.map((p)=>(
                    <Link to={`/dashboard/admin/products/${p.slug}`}>
                        <div className="card" style={{width: '18rem'}}>
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.slug} />
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description}</p>
                            <p className="card-text">{p.category.name}</p>
                            <NavLink className="btn btn-primary">{p.price}</NavLink>
                        </div>
                        </div>

                    </Link>
                ))
                    :"no products"
                }
                </div>
            </div>
        </div>
    </Layout>
  )
}
