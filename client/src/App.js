import React from 'react';
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Policy from './pages/Policy.js';
import Pagenotfound from './pages/Pagenotfound.js';
import {Register} from './pages/auth/Register.js';
import 'react-toastify/dist/ReactToastify.css';
import {Login} from './pages/auth/Login.js';
import Dashboard from './pages/user/Dashboard.js';
import { PrivateRoute } from './components/Routes/Private.js';
import {ForgetPassword} from './pages/auth/ForgetPassword.js';
import AdminDashboard from './pages/admin/AdminDashboard.js';
import { AdminRoute } from './components/Routes/AdminRoute.js';
import CreateCategory from './pages/admin/CreateCategory.js';
import CreateProduct from './pages/admin/CreateProduct.js';
import AllUsers from './pages/admin/AllUsers.js';
import {Profile} from './pages/user/Profile.js';
import Orders from './pages/user/Orders.js';
import { Products } from './pages/admin/Products.js';
import { SingleProduct } from './pages/admin/SingleProduct.js';
import { Search } from './pages/user/Search.js';
import { ProductDetails } from './pages/user/ProductDetails.js';
import {CategoryProducts} from './pages/CategoryProducts.js';
import { Cart } from './pages/Cart.js';
import { AllOrders } from './pages/admin/AllOrders.js';
import { LandingPage } from './pages/LandingPage.js';

function App() {
  return (
    <Routes>
    <Route path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/Cart' element={<Cart/>}/>    
      <Route path='/product-details/:slug' element={<ProductDetails/>}/>
      <Route path='/category/:slug' element={<CategoryProducts/>}/>
      {/* { user dashboard} */}
      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboard/>}/>
      <Route path='user/profile' element={<Profile/>}/>
      <Route path='user/orders' element={<Orders/>}/>
      </Route>
     {/* { Admin Dashboard} */}
      <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>}/>
      <Route path='admin/create-category' element={<CreateCategory/>}/>
      <Route path='admin/create-product' element={<CreateProduct/>}/>
      <Route path='admin/products' element={<Products/>}/>
      <Route path='admin/products/:slug' element={<SingleProduct/>}/>
      <Route path='admin/all-users' element={<AllUsers/>}/>
      <Route path='admin/all-orders' element={<AllOrders/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forget-password' element={<ForgetPassword/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='*' element={<Pagenotfound/>}/>
    </Routes>
  );
}

export default App;
