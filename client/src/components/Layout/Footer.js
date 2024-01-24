import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div className='bg-dark text-white text-center p-2'>
        <h4>Footer</h4>
        <p className='mt-2'>
          <Link className='m-2 text-decoration-none text-light'to='/about'>About</Link>|
          <Link className='m-2 text-decoration-none text-light'to='/contact'>Contact</Link>|
          <Link className='m-2 text-decoration-none text-light'to='/policy'>Privacy Policy</Link>
        </p>
    </div>
    
  )
}

export default Footer