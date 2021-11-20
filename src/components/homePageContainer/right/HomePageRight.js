import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import Token from '../../../artifacts/contracts/Token.sol/Token.json';
import './homePageRight.css'

const HomePageRight = ({ tokenAddress }) => {
    const [symbol, setSymbol] = useState("");
    const [balanceOf, setBalanceOf] = useState("");
    

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

    async function fetchBalanceOfToken() {
        if (typeof window.ethereum !== 'undefined') {
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
            try {
                const data = await contract.balanceOf(account);
                setBalanceOf(data.toString());
            } catch (err) {
                console.log("Error: ", err)
            }
        }
    }

    useEffect(() => {
        fetchTokenSymbol();
        fetchBalanceOfToken();
    }, [])
  
    return (
        <section className={'main-container-right'}>
            <div className={'top-info d-none d-lg-flex justify-between items-center main-container-right-sub-content'}>
                <div>1 {symbol} = $234</div>
                <div>
                    Total Value: {balanceOf / (10 ** 18)}
                </div>
                <button
                    className={'tnx-history-btn cursor-pointer'}/*
                    onClick={openTnxHistoryModal}*/>
                    Transaction History
                </button>
            </div>
            <div className={'main-container-right-content'}>
                <div className={'top-info d-flex d-lg-none justify-between items-center main-container-right-sub-content'}>
                    <div>1 {symbol} = $234</div>
                    <div>
                      Total Value: {balanceOf / (10 ** 18)}
                    </div>
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
