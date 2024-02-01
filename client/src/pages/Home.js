import React from 'react'
import Layout from '../components/Layout/Layout'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { Prices } from '../components/Prices'
import { useCart } from '../context/cart'

export default function Home() {
  const navigate = useNavigate()
  const [cart,setCart] = useCart()
  const [categories,setCategories] = useState([])
  const [products,setProducts] = useState([])
  const [checked,setChecked] = useState([])
  const [radio,setRadio] = useState([]) 
  const [total,setTotal]= useState()
  const [page,setPage] = useState(1)

  const loadMore = async ()=>{
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/more-product/${page}`)
    setProducts([...products,...res.data.products])
  }
  
  useEffect(()=>{
    if(page === 1) return
    loadMore()
  },[page])

  const getCategories = async() =>{
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`)
      setCategories(res.data.categories)
    } catch (error) {
      console.log(error)
    }
  
  }

  const totalProduct = async()=>{
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-total`)
    setTotal(res.data.total)
  }

  useEffect(()=>{
    getCategories()
    totalProduct()
  },[])


  //getting all products 
  const allProducts = async () =>{
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/more-product/${page}`)
    setProducts(res.data.products)
}

//useEffect for calling function when this components render
useEffect(() => {
   if(!checked.length || !radio.length) allProducts();
}, [checked.length,radio.length])

const filterProduct = async () =>{
  try {
    
    const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`,{checked,radio})
    setProducts(res.data.products)
  } catch (error) {
    console.log(error)
  }
 
}

useEffect(()=>{
  if(checked.length || radio.length) filterProduct();
},[checked.length,radio.length])

const handleFilter = (value,id) =>{
  let all = [...checked]
  if(value){
    all.push(id)
  }else{
    all = all.filter(c=>c!==id)
  }
  setChecked(all)
}



  return (
    <Layout tittle="Home - shop now">
    <div className='row mt-2'>
      <div className="col-md-2 text-center">
      <h3>Filter By Category</h3>
      <div className="d-flex flex-column">
      { categories ? categories.map((c)=>(
       
        <div key={c._id}  className="form-check">
        <input className="form-check-input" onChange={(e)=>handleFilter(e.target.checked,c._id)} type="checkbox" id="flexCheckDefault" />
        <label className="form-check-label" htmlFor="flexCheckDefault">
         {c.name}
         </label>
        </div>

      
      )) : "no filters"}
      </div>
      <h3>Filter By Price</h3>
        <div className='d-flex flex-column'>
        <div className="form-check d-flex flex-column">
        {Prices.map((p)=>(
      
          
          <div key={p._id} className="form-check">
          <input className="form-check-input" value={p.array} type="radio" onChange={(e)=>setRadio(e.target.value)} name="flexRadioDefault" id="flexRadioDefault1" />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            {p.name}
          </label>
          </div>

        
      
        ))}
        </div>
        <button className="btn btn-success" onClick={()=>{window.location.reload()}}>Remove Filter</button>
      </div>
      </div>
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
                
                {products && products.length<total && (
                  <button className="w-25 bg-dark text-white" onClick={(e)=>{
                  e.preventDefault()
                  setPage(page + 1)
                }}>Load More</button>
                )}
              
      </div>    
    </Layout>
  )
}
