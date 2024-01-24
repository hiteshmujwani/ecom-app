import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

export default function Home() {
  const [auth,setAuth] = useAuth()
  return (
    <Layout tittle="Home - shop now">
    <div>Home</div>
    <pre>{JSON.stringify(auth)}</pre>
    </Layout>
  )
}
