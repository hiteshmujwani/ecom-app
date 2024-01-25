import React from 'react';
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Policy from './pages/Policy.js';
import Pagenotfound from './pages/Pagenotfound.js';
import Register from './pages/auth/Register.js';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/auth/Login.js';
import Dashboard from './pages/user/Dashboard.js';
import { PrivateRoute } from './components/Routes/Private.js';
import ForgetPassword from './pages/auth/ForgetPassword.js';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>

      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='' element={<Dashboard/>}/>
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
