import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UserMenu() {
  return (
    <div className="list-group mt-2">
    <NavLink to={'/dashboard/user/profile'} className="list-group-item ">Your Profile</NavLink>
    <NavLink to={'/dashboard/user/orders'} className="list-group-item">Your Orders</NavLink>
    </div>
  )
}
