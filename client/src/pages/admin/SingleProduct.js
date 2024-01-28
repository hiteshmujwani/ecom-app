import React from 'react'
import { useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'

export const SingleProduct = () => {
    const params = useParams()
    const [categories,setCategories] = useState([])
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [shipping, setShipping] = useState('')
  const [id,setId] = useState()
  const navigate = useNavigate()

  const getCategories = async() =>{
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`)
    console.log()
    setCategories(res.data.categories)
  }
  useEffect(()=>{
    getCategories()
  },[])

    //geting single product 
    const singleProduct = async (req) =>{
        console.log("first")
        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
        console.log(res)
        setName(res.data.product.name)
        setCategory(res.data.product.category)
        setDescription(res.data.product.description)
        setPrice(res.data.product.price)
        setQuantity(res.data.product.quantity)
        setShipping(res.data.product.shipping)
        setId(res.data.product._id)

    }

    useEffect(()=>{
        singleProduct()

    },[])


    const handleUpdateProduct = async (e) =>{
        e.preventDefault()
        const productdata = new FormData()
        productdata.append("name",name)
        productdata.append("description",description)
        productdata.append("price",price)
        productdata.append("category",category)
        productdata.append("quantity",quantity)
        productdata.append("photo",photo)
        productdata.append("shipping",shipping)
        const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,productdata)
        if(res.data.success){
          toast.success("product created")
          navigate('/dashboard/admin/products')
        }
      } 

      // handling delete product request
      const handleDeleteProduct = async ()=>{
        let answer = window.prompt('are you sure you want to delete ?')
        if(!answer){
          return
        }
        const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
        if(res.data.success){
          toast.error(res.data.message)
          navigate('/dashboard/admin/products')
        }
      }
  return (
    <Layout tittle="Create product - ECOMMERCE APP">
    <div className="container-fluid">
      <div className="row">
         <div className="col-md-3">
          <AdminMenu/>
         </div>
         <div className="col-md-9">
          <h1>Create Product</h1>
          <div>
            
              <select className='w-100' onChange={(e)=>{setCategory(e.target.value)}} >
                {categories.map((c)=>(
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>

              <label className='btn btn-outline-secondary mt-3 w-100'>
                {photo ? photo.name : "upload photo"}
                <input type="file" name='photo' accept='image/*' onChange={(e)=>{setPhoto(e.target.files[0])}} hidden />
              </label>

              <div className=''>
                preview
                {photo ?(<img src={URL.createObjectURL(photo)} alt='product-img' height={"200px"}/>):(<img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`} alt='product-img' height={"200px"}/>)}
              </div>

              <input type='text' name='name' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Product name'/>
              <input type='textarea' name='description' value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder='Product Description'/>
              <input type='number' name='quantity' value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} placeholder='Product quantity'/>
              <input type='number' name='price' value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='Product price'/>
              <select onChange={(e)=> {setShipping(e.target.value)}}>
                <option value={true}>no</option>
                <option value={false}>yes</option>
              </select>
                
                <button type="submit" onClick={handleUpdateProduct}>Update Product</button>
                <button type="submit" onClick={handleDeleteProduct}>delete Product</button>
           
          </div>
         </div>
      </div>
    </div>
  </Layout>
    
  )
}
