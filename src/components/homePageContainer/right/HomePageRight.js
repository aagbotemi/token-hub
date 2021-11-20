import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import Token from '../../../artifacts/contracts/Token.sol/Token.json';
import './homePageRight.css'
import SendCoin from './components/SendCoin';


import BaseButton from '../../BaseButton'

const HomePageRight = ({ tokenAddress, requestWallet }) => {
    const [symbol, setSymbol] = useState("");
    const [balanceOf, setBalanceOf] = useState("");
    const [receiverAccount, setReceiverAccount] = useState('');
    const [amount, setAmount] = useState(0);

    const [sendCoinModal, setSendCoinModal] = useState(false);

    async function openSendCoinModal() {
        setSendCoinModal(true);
    }

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

    async function sendCoins(e) {
        e.preventDefault();
        try {
            if (typeof window.ethereum !== 'undefined') {
                await requestWallet()
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
                const transaction = await contract.transfer(receiverAccount, amount);
                
                await transaction.wait();
                setSendCoinModal(!sendCoinModal);
                console.log(`${amount} Coins successfully sent to ${receiverAccount}`);
            }
        } catch (error) {
            console.log(error)
            setSendCoinModal(!sendCoinModal)
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
                <div className={'top-info d-flex d-lg-none justify-between items-center main-container-right-sub-content flex-wrap'}>
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

                <div className={'transaction-button mt-2 mt-lg-0'}>
                    {/* <button className={'open-modal-button cursor-pointer'}
                            onClick={openSendCoinModal}
                    >Send Coins</button> */}
                    <BaseButton
                        className={'open-modal-button cursor-pointer'}
                        text="Send Coins"
                        onClick={openSendCoinModal}
                    />
                </div>

                {sendCoinModal && <SendCoin
                    setReceiverAccount={setReceiverAccount}
                    setAmount={setAmount}
                    setSendCoinModal={setSendCoinModal}
                    sendCoinModal={sendCoinModal}
                    sendCoins={sendCoins}
                />}
            </div>
        </section>
    )
}

export default HomePageRight
