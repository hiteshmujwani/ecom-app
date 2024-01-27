import React from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout/Layout'

export default function AllUsers() {
  return (
    <Layout tittle="All Users - ECOMMERCE APP">
    <div className="container-fluid">
      <div className="row">
         <div className="col-md-3">
          <AdminMenu/>
         </div>
         <div className="col-md-3">
          All Users
         </div>
      </div>
    </div>
  </Layout>
  )
}
