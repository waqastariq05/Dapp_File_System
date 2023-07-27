import React, { useContext, useState } from 'react'
import '../Banner/Banner.css'
import Card from '../Card/Card'
import DriveContext from '../../Context/DriveContext';

const Banner = () => {
    const context = useContext(DriveContext);
    const { etherApi, account } = context;
    const [data, setData] = useState("");

    const getData = async (e) => {
        let dataArray;
        const Otheraddress = document.querySelector(".address").value;
        const { contract } = etherApi;
        try {
            if (Otheraddress) {
                dataArray = await contract.display(Otheraddress);
            }
            else {
                dataArray = await contract.display(account);
            }
        } catch {
            alert("You don't have access");
        }

        if (dataArray !== undefined) {
            const isEmpty = Object.keys(dataArray).length === 0;

            if (!isEmpty) {
                const str = dataArray.toString();
                const str_array = str.split(",");
                const images = str_array.map((item, i) => {
                    return (
                        <div className='col-md-4' key={i}>
                            <Card link={item} img={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} />
                        </div>
                    );
                });
                setData(images)
                document.getElementsByClassName("App").item(0).style.height = "auto";
            } else {
                alert("No image to display");
            }
        }
    };

    return (
        <div className='banner'>
            <div className='container'>
                <div className='top'>
                    <h2>Decentralize Drive</h2>
                    <h3>Account: <span>{account ? account : "Not Connected"}</span></h3>
                </div>
                <div className='row'>
                    {data}
                </div>
                <div className='dataBox'>
                    <div>
                        <input type="text" className="form-control address" placeholder='Enter Address' />
                        <button className="btn" onClick={getData}>Get Data</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
