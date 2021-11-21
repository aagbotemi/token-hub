import React from 'react'
import { Link } from 'react-router-dom'
import './404.css'

const NotFound = () => {
    return (
        <div className='page-not-found'>
            <h2>Oops! Page not found.</h2>
            <h1>404</h1>
            <p>We can't find the page you're looking for.</p>
            <Link to="/" className='mt-1'>Go back home</Link>
        </div>
    )
}

export default NotFound
