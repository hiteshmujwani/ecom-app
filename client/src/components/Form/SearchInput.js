import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../../context/search'
import axios from 'axios'

export const SearchInput = () => {
    const [value,setValue] = useSearch()
    const navigate = useNavigate()

    const handleSearch = async (e) =>{
        try {
            e.preventDefault()
            const res = await axios.get(`/api/v1/product/search/${value.keyword}`)
            setValue({...value,results:res.data})
            navigate('/search')
        
        } catch (error) {
            console.log("error in searching product" + error)
        }
    }
  return (
    <div>
    <form className="d-flex" role="search" onSubmit={handleSearch}>
    <input className="form-control me-2" value={value.keyword} onChange={(e)=>{setValue({...value,keyword:e.target.value})}}  type="search" placeholder="Search" aria-label="Search" />
    <button className="btn btn-outline-success" type="submit">Search</button>
  </form>
  </div>

  )
}
