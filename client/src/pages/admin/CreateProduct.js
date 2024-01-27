import React from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout/Layout'
export default function CreateProduct() {
  return (
    <Layout tittle="Create product - ECOMMERCE APP">
    <div className="container-fluid">
      <div className="row">
         <div className="col-md-3">
          <AdminMenu/>
         </div>
         <div className="col-md-3">
          Create Product
         </div>
      </div>
    </div>
  </Layout>
  )
}
