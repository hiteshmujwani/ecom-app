import React from 'react'
import { useSearch } from '../../context/search'
import Layout from '../../components/Layout/Layout'
import { NavLink , useNavigate} from 'react-router-dom'
import { useCart } from '../../context/cart'
export const Search = () => {
  const [cart,setCart] = useCart()
  const navigate = useNavigate()
    const [value] = useSearch()
  return (
    <Layout>
        {value.results ? value.results.map((p)=>(
                        <div className="card" style={{width: '18rem'}}>
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.slug} />
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0,30)}...</p>
                            <p className="card-text">{p.category.name}</p>
                            <p className="text-danger">$ {p.price}</p>
                            <button onClick={()=>{navigate(`/product-details/${p.slug}`)}} className="btn btn-primary ms-2">More Details</button>
                            <button onClick={()=>{setCart([...cart,p]); localStorage.setItem('cart',JSON.stringify([...cart,p]))}} className="btn btn-danger ms-2">Add To Cart</button>
                        </div>
                        </div>
                ))
                    :"no products"
                }
    </Layout>
  )
}
