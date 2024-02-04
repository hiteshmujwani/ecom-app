import React from 'react'
import { useEffect,useState } from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import toast from 'react-hot-toast'
import '../../styles/createcategory.css'

export default function CreateCategory() {
  const [categories,setCategories] = useState([])
  const [name,setName] = useState('')
  const [Selected, setSelected] = useState('')
  const [UpdatedName, setUpdatedName] = useState('')

  //sending request for all categories
  const getCategories = async() =>{
    const res = await axios.get(`/api/v1/category/all-categories`)
    console.log()
    setCategories(res.data.categories)
  }

// handling new Category Post request
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const res = await axios.post(`/api/v1/category/create-category`,{name})
    if(res.data.success){
      toast.success("category Created")
    }
    getCategories()

  }
// handling Category update request
  const handleUpdate = async(e) =>{
    e.preventDefault()
    
    const res = await axios.put(`/api/v1/category/update-category/${Selected}`,{name:UpdatedName})
    if(res.data.success){
      toast.success("category updated")
    }else{
      toast.error("not updated")
    }
    getCategories()
  }

  //handling delete request 
  const handleDelete = async (id) =>{

    const res = await axios.delete(`/api/v1/category/delete-category/${id}`)
    if(res.data.success){
      toast.success("category deleted")
    }
    getCategories()
  }
  useEffect(()=>{
    getCategories()
  },[])

  return (
    <Layout tittle="Create Category - ECOMMERCE APP">
    <div className="container-fluid">
      <div className="row">
         <div className="col-md-3">
          <AdminMenu/>
         </div>
         <div className="col-md-9">
         <h1 className='actions text-3xl font-medium text-center border mt-2 border-black p-3 bg-gray-500 text-white'>Manage Categories</h1>
         <CategoryForm value={name} setValue={setName} handleSubmit={handleSubmit}/>
     <div>
  <table className="table border">
    <thead>
      <tr>
        <th className='font-bold text-2xl'>CATEGORY NAME</th>
        <th className='text-center'>ACTIONS</th>
      </tr>
    </thead>
    <tbody>
    {categories.map((c)=>{
      return (
        <tr key={c._id}>
        <td className='font-normal text-xl' >{c.name}</td>
        <td className='flex gap-2 justify-center'><button className="actions p-2 px-5 rounded text-white" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onClick={()=>{setSelected(c._id);setUpdatedName(c.name)}}>EDIT</button> <button className='actions rounded p-2 px-5 text-white' onClick={()=>{handleDelete(c._id)}}>DELETE</button></td>
      </tr>
      )
    })}
    </tbody>
  </table>
</div>
  </div>

 <div>
  <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Update Category</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <CategoryForm value={UpdatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onClick={handleUpdate}>Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  </Layout>
  )
}
