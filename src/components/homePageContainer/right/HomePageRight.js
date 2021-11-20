import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import Token from '../../../artifacts/contracts/Token.sol/Token.json';
import './homePageRight.css'

const HomePageRight = ({ tokenAddress }) => {
    const [symbol, setSymbol] = useState("");

    async function fetchTokenSymbol() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
            try {
                const data = await contract.symbol()
                setSymbol(data)
            } catch (err) {
                console.log("Error: ", err)
            }
        }
    }

    useEffect(() => {
        fetchTokenSymbol();
    }, [])
  
    return (
        <section className={'main-container-right'}>
            <div className={'top-info d-none d-lg-flex justify-between items-center main-container-right-sub-content'}>
                <div>1 {symbol} = $234</div>
                <div>Total Value: 2000</div>
                <button
                    className={'tnx-history-btn cursor-pointer'}/*
                    onClick={openTnxHistoryModal}*/>
                    Transaction History
                </button>
            </div>
            <div className={'main-container-right-content'}>
                <div className={'top-info d-flex d-lg-none justify-between items-center main-container-right-sub-content'}>
                    <div>1 {symbol} = $234</div>
                    <div>Total Value: 222</div>
                    <button
                        className={'tnx-history-btn cursor-pointer'}
                        /*onClick={openTnxHistoryModal}*/>
                        Transaction History
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HomePageRight
