import React, { useContext, useState } from 'react'
import '../Modal/Modal.css'
import axios from "axios";
import DriveContext from '../../Context/DriveContext';

const UploadModal = () => {
    const context = useContext(DriveContext);
    const { etherApi, account } = context;
    const [file, setFile] = useState(null);

    console.log(process.env.REACT_APP_PINATA_API_KEY)
    const handleUplaod = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                const closeModal = document.getElementById("upload");

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
                        'pinata_secret_api_key': process.env.REACT_APP_PINATA_API_SECRET,
                        "Content-Type": "multipart/form-data",
                    },
                });

                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                etherApi.contract.add(account, ImgHash);
                alert("Successfully Image Uploaded To IPFS");
                setFile(null);
                closeModal.classList.remove("show");
            }
            catch {
                alert("Image not Uploaded to IPFS");
            }
            alert("Successfully Image Uploaded");
        }
    }

    const change = (e) => {
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        e.preventDefault();
    }
    return (
        <>
            {/* Uplaod Modal */}
            <div className="modal fade" id="upload" tabIndex="-1" aria-labelledby="upload" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="upload">Upload A File</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleUplaod}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="file" className="form-label">Choose File</label>
                                    <input type="file" className="form-control" id="file" name="file" onChange={change} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadModal
