import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Header = () => {
    return (
        <>
            <header className='header'>
                <div className="components">
                    <Link to="/">
                        <div className='home-page'>
                            <h6>Home</h6>
                        </div>
                    </Link>
                    <Link to="/upload">
                        <div className='upload-page'>
                            <h6>Upload</h6>
                        </div>
                    </Link>
                </div>
            </header>
        </>
    )
}

export default Header
