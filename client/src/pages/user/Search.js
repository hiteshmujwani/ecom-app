import React from 'react'
import { useSearch } from '../../context/search'
import Layout from '../../components/Layout/Layout'
import { useCart } from '../../context/cart'
import { Link } from '@mui/material'
import toast from 'react-hot-toast'
export const Search = () => {
  const [cart,setCart] = useCart()
    const [value] = useSearch()
  return (
       <Layout>
<div className="col-md-12 gap-4 flex flex-column align-items-center" style={{"minheight":"80vh"}}>
        <div className="d-flex flex-wrap justify-center gap-4 p-3">
          {value?.results.length > 0 ? 
          (
            value?.results.map((p) => (
              
              <div className="card">
                <Link to={`/product-details/${p.slug}`} className="card-img">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.slug}
                  />
                </Link>
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
                  <div
                    className="card-button"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("ITEM ADDED TO CART")
                    }}
                  >
                    <svg className="svg-icon" viewBox="0 0 20 20">
                      <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z" />
                      <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z" />
                      <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z" />
                    </svg>
                  </div>
                </div>
              </div>
              
            ))):(<div className='flex flex-col justify-center align-items-center text-3xl font-bold' style={{"height":"80vh"}}> No Prouduct Found ! </div>)}
            </div>
            </div>
            </Layout>)
}
