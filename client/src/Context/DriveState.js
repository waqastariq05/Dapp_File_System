import { useState } from "react";
import DriveContext from "./DriveContext";
import Drive from "../artifacts/contracts/Drive.sol/Drive.json";
const ethers = require("ethers")

const DriveState = (props) => {
    const [etherApi, setEtherApi] = useState({
        contract: null,
        signer: null,
        provider: null
    });

    const [account, setAccount] = useState('');

    // Connect To Meta Mask
    const loadProvider = async () => {
        const { ethereum } = window;
        const provider = new ethers.BrowserProvider(ethereum);
        if (provider) {
            ethereum.on("chainChanged", () => {
                window.location.reload();
            });

            ethereum.on("accountsChanged", () => {
                window.location.reload();
            });

            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address)

            let contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
            console.log(contractAddress)
            const contract = new ethers.Contract(contractAddress, Drive.abi, signer)
            setEtherApi({ contract, signer, contract })
        } else {
            alert("Please install MetaMask!")
        }
    };

    // Get Access List
    const [accessList, setAccesslist] = useState([]);
    const getAccessList = async () => {
        const { contract } = etherApi;
        const access = await contract.shareAccess();
        setAccesslist(access)
    }

    return (
        <DriveContext.Provider value={{ etherApi, loadProvider, account, accessList, getAccessList }}>
            {props.children}
        </DriveContext.Provider>
    );
};

export default DriveState;
