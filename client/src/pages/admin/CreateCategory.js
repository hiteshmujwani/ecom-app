import React from 'react'
import { useEffect,useState } from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import toast from 'react-hot-toast'

export default function CreateCategory() {
  const [categories,setCategories] = useState([])
  const [name,setName] = useState('')
  const [Selected, setSelected] = useState('')
  const [UpdatedName, setUpdatedName] = useState('')

  //sending request for all categories
  const getCategories = async() =>{
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`)
    console.log()
    setCategories(res.data.categories)
  }

// handling new Category Post request
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name})
    if(res.data.success){
      toast.success("category Created")
    }
    getCategories()

  }
// handling Category update request
  const handleUpdate = async(e) =>{
    e.preventDefault()
    
    const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${Selected}`,{name:UpdatedName})
    if(res.data.success){
      toast.success("category updated")
    }else{
      toast.error("not updated")
    }
    getCategories()
  }

  //handling delete request 
  const handleDelete = async (id) =>{

    const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`)
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
         <h1>Manage Categories</h1>
         <CategoryForm value={name} setValue={setName} handleSubmit={handleSubmit}/>
     <div>
  <table className="table">
    <thead>
      <tr>
        <th>Category Name</th>
        <th>actions</th>
      </tr>
    </thead>
    <tbody>
    {categories.map((c)=>{
      return (
        <tr key={c._id}>
        <td >{c.name}</td>
        <td ><button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onClick={()=>{setSelected(c._id);setUpdatedName(c.name)}}>edit</button> <button className='btn btn-primary ms-2' onClick={()=>{handleDelete(c._id)}}>delete</button></td>
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
