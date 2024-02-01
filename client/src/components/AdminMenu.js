import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminMenu() {
  return (
    <div className="list-group mt-2">
  <NavLink to={'/dashboard/admin/create-category'} className="list-group-item ">Create Category</NavLink>
  <NavLink to={'/dashboard/admin/create-product'} className="list-group-item">Create Product</NavLink>
  <NavLink to={'/dashboard/admin/products'} className="list-group-item">Products</NavLink>
  <NavLink to={'/dashboard/admin/all-orders'} className="list-group-item">All Orders</NavLink>
  <NavLink to={'/dashboard/admin/all-users'} className="list-group-item">All Users</NavLink>
</div>


  )
}
