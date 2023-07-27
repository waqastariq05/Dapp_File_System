import React, { useEffect, useContext, useState } from 'react'
import '../Modal/Modal.css'
import DriveContext from '../../Context/DriveContext';

const ShareUplaod = () => {
    const context = useContext(DriveContext);
    const { etherApi, account, accessList, getAccessList } = context;
    const { contract } = etherApi;
    const closeModal = document.getElementById("share");

    useEffect(() => {
        contract && getAccessList();
    }, [contract])

    const handleShareAllow = async (e) => {
        const address = document.getElementById("address").value;
        try {
            await contract.allow(address);
            alert("Share Access successfully")
        } catch (error) {
            alert("Coule not share Access")
        }
        closeModal.classList.remove("show");
    }

    const handleShareDisallow = async (e) => {
        const selectedAddress = document.getElementById("selectedAddress").value;
        try {
            await contract.disAllow(selectedAddress);
            alert("Access Revoke successfully")
        } catch (error) {
            alert("Coule not Revoke Access")
        }
        closeModal.classList.remove("show");
    }

    return (
        <>
            {/* Share Moda; */}
            <div className="modal fade" id="share" tabIndex="-1" aria-labelledby="share" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="share">Share With Anyone</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Enter Address</label>
                                <input type="text" className="form-control" id="address" placeholder='Address' name='address' />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" onClick={handleShareAllow}>Share</button>
                        </div>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="share">Revoke Access</h1>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="accessList" className="form-label">Access List</label>
                                <select className="form-select" aria-label="accessList" id='accessList'>
                                    <option defaultValue>People With Access</option>
                                    {accessList && accessList.map((acc) => {
                                        return (<option key={acc} id='selectedAddress'>{acc}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn" onClick={handleShareDisallow}>Revoke</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ShareUplaod
