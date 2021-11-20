import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

const Header = () => {
    return (
        <nav className={'d-flex justify-center'}>
              <div className={'navbar-container d-flex justify-between items-center'}>
                <div className="navbar-brand">
                    <Link to={'/'}>
                        <span>AAToken</span>✨
                    </Link>
                </div>
                <div className={'d-flex items-center'}>
                    <div style={{fontSize: '20px'}}
                        className={'about cursor-pointer'}
                    >
                        <Link to={'/about'}>
                            About
                        </Link>
                    </div>
                  {/*<p className={'ml-2'}>Dark</p>*/}
                </div>
            </div>
        </nav>
    )
}

export default Header
