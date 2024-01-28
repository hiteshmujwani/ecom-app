import React from 'react'
import Layout from '../components/Layout/Layout'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { Prices } from '../components/Prices'

export default function Home() {
  const [categories,setCategories] = useState([])
  const [products,setProducts] = useState()
  const [checked,setChecked] = useState([])
  const [radio,setRadio] = useState([]) 


  const getCategories = async() =>{
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`)
      setCategories(res.data.categories)
    } catch (error) {
      console.log(error)
    }
  
  }

  useEffect(()=>{
    getCategories()
  },[])


  //getting all products 
  const allProducts = async () =>{
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-all-products`)
    setProducts(res.data.products)
}

//useEffect for calling function when this components render
useEffect(() => {
   if(!checked.length || !radio.length) allProducts()
}, [checked.length,radio.length])

const filterProduct = async () =>{
  try {
    console.log(radio)
    const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`,{checked,radio})
    console.log(res.data.products)
    setProducts(res.data.products)
  } catch (error) {
    console.log(error)
  }
 
}

useEffect(()=>{
  if(checked.length || radio.length) filterProduct()
},[checked,radio])

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
        <>
        <div key={c._id}  className="form-check">
        <input className="form-check-input" onChange={(e)=>handleFilter(e.target.checked,c._id)} type="checkbox" id="flexCheckDefault" />
        <label className="form-check-label" htmlFor="flexCheckDefault">
         {c.name}
         </label>
        </div>

        </>
      )) : "no filters"}
      </div>
      <h3>Filter By Price</h3>
        <div className='d-flex flex-column'>
        <div className="form-check d-flex flex-column">
        {Prices.map((p)=>(
          <>
          
          <div key={p._id} className="form-check">
          <input className="form-check-input" value={p.array} type="radio" onChange={(e)=>setRadio(e.target.value)} name="flexRadioDefault" id="flexRadioDefault1" />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            {p.name}
          </label>
          </div>

        
          </>
        ))}
        
        </div>
      </div>
      </div>
      <h1>{checked}</h1>
      <div className="col-md-10 d-flex flex-wrap justify-content-center align-items-center">
      {products ? products.map((p)=>(
                        <div className="card" style={{width: '18rem'}}>
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.slug} />
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description}</p>
                            <p className="card-text">{p.category.name}</p>
                            <NavLink className="btn btn-primary">{p.price}</NavLink>
                        </div>
                        </div>
                ))
                    :"no products"
                }
                </div>
      </div>
    </Layout>
  )
}
