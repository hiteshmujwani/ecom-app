import React from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import {useState , useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function CreateProduct() {
  const [categories,setCategories] = useState([])
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [shipping, setShipping] = useState('')
  const navigate = useNavigate()

  const getCategories = async() =>{
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`)
    console.log()
    setCategories(res.data.categories)
  }
  useEffect(()=>{
    getCategories()
  },[])

  //create product request
  const handleCreateProduct = async (e) =>{
    e.preventDefault()
    const productdata = new FormData()
    productdata.append("name",name)
    productdata.append("description",description)
    productdata.append("price",price)
    productdata.append("category",category)
    productdata.append("quantity",quantity)
    productdata.append("photo",photo)
    productdata.append("shipping",shipping)
 
    const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,productdata)
    if(res.data.success){
      toast.success("product created")
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
                {photo ? photo.name : "Upload Photo"}
                <input type="file" name='photo' accept='image/*' onChange={(e)=>{setPhoto(e.target.files[0])}} hidden />
              </label>

              <div className=''>
                preview
                {photo && <img src={URL.createObjectURL(photo)} alt='product-img' height={"200px"}/>}
              </div>

              <input type='text' name='name' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Product name'/>
              <input type='textarea' name='description' value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder='Product Description'/>
              <input type='number' name='quantity' value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} placeholder='Product quantity'/>
              <input type='number' name='price' value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='Product price'/>
              <select onChange={(e)=> {setShipping(e.target.value)}}>
                <option value={true}>no</option>
                <option value={false}>yes</option>
              </select>
                
                <button type="submit" onClick={handleCreateProduct}>Create Product</button>
           
          </div>
         </div>
      </div>
    </div>
  </Layout>
  )
}
