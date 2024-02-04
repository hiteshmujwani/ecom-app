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
    const res = await axios.get(`/api/v1/category/all-categories`)

    setCategories(res.data.categories)
  }
  useEffect(()=>{
    getCategories()
  },[])

  //create product request
  const handleCreateProduct = async (e) =>{
    const productdata = new FormData()
    productdata.append("name",name)
    productdata.append("description",description)
    productdata.append("price",price)
    productdata.append("category",category)
    productdata.append("quantity",quantity)
    productdata.append("photo",photo)
    productdata.append("shipping",shipping)
 
    const res = await axios.post(`/api/v1/product/create-product`,productdata)
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
         <div className="col-md-9 mt-2" style={{"height":"80vh"}}> 
          <h1 className='text-3xl font-medium text-center p-3 border border-black bg-gray-500 text-white'>Create Your New Product</h1>
          <div className='flex flex-col'> 
          <div className='flex w-100 mt-3 gap-3'>
              <select className='w-50' onChange={(e)=>{setCategory(e.target.value)}} >
              <option>select Category</option>
                {categories.map((c)=>(
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>

              <label className='actions text-center text-white font-medium text-xl uppercase w-50 px-3 py-2'>
                {photo ? photo.name : "Upload Photo"}
                <input type="file" name='photo' accept='image/*' onChange={(e)=>{setPhoto(e.target.files[0])}} hidden />
              </label>
              </div>

              <div className='mt-2 w-25'>
                <h1 className=' text-xl bg-gray-500 text-white p-2 text-center font-medium'>PREVIEW OF SELECTED PHOTO</h1>
                {photo && <img src={URL.createObjectURL(photo)} className='' alt='product-img'/>}
              </div>

              <input className="mt-3 font-medium" type='text' name='name' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Product name'/>
              <input type='textarea' className='border border-black p-2 mt-3 font-medium' name='description' value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder='Product Description'/>
              <div className="mt-3 flex w-100 gap-3"><input className='w-50' type='number' name='quantity' value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} placeholder='Product quantity'/>
              <input type='number' className='w-50' name='price' value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='Product price'/>
              </div>
                
                <button className='actions w-25 self-center mt-5 py-3 px-6 text-white text-2xl font-medium' type="submit" onClick={handleCreateProduct}>Create Product</button>
           
          </div>
         </div>
      </div>
    </div>
  </Layout>
  )
}
