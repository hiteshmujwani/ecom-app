import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
export default function useCategory() {
    const [categories,setCategories] = useState()
    
    //get all categories
    const getCategories = async() =>{
        const res = await axios.get(`/api/v1/category/all-categories`)

        setCategories(res.data.categories)                                  
      }

      useEffect(()=>{
        getCategories()
      },[])

      return categories
}
