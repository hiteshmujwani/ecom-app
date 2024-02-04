import React from 'react'
import {Header} from './Header.js'
import Footer from './Footer.js'
import Helmet from 'react-helmet'
import { Toaster } from 'react-hot-toast';
export default function Layout(props) {
  return (
    <div>
    <Helmet>
    <meta name="description" content={props.description}/>
    <meta name="keywords" content={props.keywords}/>
    <meta name="author" content={props.author}/>
    <title>{props.tittle}</title>
    </Helmet>
        <Header/>
        <main style={{"minheight":"80vh"}}>
            {props.children}
            <Toaster/>
        </main>
        <Footer/>
    </div>
  )
}
