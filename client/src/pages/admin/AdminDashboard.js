import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import { useAuth } from '../../context/auth'
export default function AdminDashboard() {
  const [auth] = useAuth()
  return (
    <Layout tittle="ADMIN DASHBOARD - ECOMMERCE APP">
      <div className="container-fluid">
        <div className="row">
           <div className="col-md-3">
            <AdminMenu/>
           </div>
           <div className="col-md-3">
            <div className="card">
              <h3>ADMIN NAME : {auth.user.name}</h3>
              <h3>ADMIN EMAIL : {auth.user.email}</h3>
              <h3>ADMIN CONTACT : {auth.user.phone}</h3>
            </div>
           </div>
        </div>
      </div>
    </Layout>
  )
}
