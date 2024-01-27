import React from 'react'
import UserMenu from '../../components/UserMenu'
import Layout from '../../components/Layout/Layout'

export default function Orders() {
  return (
    <Layout tittle="Create Category - ECOMMERCE APP">
    <div className="container-fluid">
      <div className="row">
         <div className="col-md-3">
          <UserMenu/>
         </div>
         <div className="col-md-3">
          Your Orders
         </div>
      </div>
    </div>
  </Layout>
  )
}
