import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/UserMenu'
import { useAuth } from '../../context/auth'
function Dashboard() {
    const [auth] = useAuth()
  return (
    <Layout tittle="ADMIN DASHBOARD - ECOMMERCE APP">
      <div className="container-fluid">
        <div className="row">
           <div className="col-md-3">
            <UserMenu/>
           </div>
           <div className="col-md-9" style={{"height":"80vh"}}>
            <div className="mt-2 text-4xl flex flex-col gap-3 font-medium border-black border" >
              <h3>USER NAME : {auth.user.name}</h3>
              <h3>USER EMAIL : {auth.user.email}</h3>
              <h3>USER CONTACT : {auth.user.phone}</h3>
            </div>
           </div>
        </div>
      </div>
    </Layout>
    
  )
}

export default Dashboard