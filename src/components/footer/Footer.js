import React from 'react'
import './footer.css'

const Footer = () => {
    return (
        <footer className={'text-center'}>
            <div className="developer-details">
                Designed &amp; Developed by <a href="https://www.linkedin.com/in/abiodun-awoyemi-1ab8b3165/" target="_blank" rel="noopener noreferrer">Abiodun Awoyemi</a>
            </div>
            <div className="copyright mt-1">
                Copyright &copy; {new Date().getFullYear()} TokenHub
            </div>
        </footer>
    )
}

export default Footer
