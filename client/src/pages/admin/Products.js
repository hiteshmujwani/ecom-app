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
        const res = await axios.get(`/api/v1/product/get-all-products`)
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
                <h1 className='text-center mb-5 font-black text-4xl'>All Products List</h1>
                <div className="d-flex flex-wrap gap-4 align-items-center justify-content-center">
                {products &&
            products.map((p) => (
                <Link to={`/dashboard/admin/products/${p.slug}`}>
              <div className="card">
                <div className="card-img">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.slug}
                  />
                </div>
                <div className="card-info">
                  <p className="text-xl font-bold">{p.name.substring(0,20)}...</p>
                  <p className="text-body">
                    {p.description.substring(0, 30)}...
                  </p>
                </div>
                <div className="card-footer">
                  <span className="text-xl font-medium flex gap-3">
                    ${p.price}
                    <p className="line-through text-danger">
                      ${p.price + (p.price * 40) / 100}
                    </p>
                  </span>
                </div>
              </div>
              </Link>
            ))}
                </div>
            </div>
        </div>
    </Layout>
  )
}
