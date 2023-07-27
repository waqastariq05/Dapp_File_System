import React from 'react'
import '../Navbar/Navbar.css'
import ShareModal from '../Modal/ShareModal'
import UploadModal from '../Modal/UploadModal'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand" href='/'>Drive</a>
                    <div className="d-flex">
                        <button className="btn me-3" type="submit" data-bs-toggle="modal" data-bs-target="#share" >Share</button>
                        <button className="btn" type="submit" data-bs-toggle="modal" data-bs-target="#upload" >Upload File</button>
                    </div>
                </div>
            </nav>
            <UploadModal />
            <ShareModal />
        </div>
    )
}

export default Navbar
