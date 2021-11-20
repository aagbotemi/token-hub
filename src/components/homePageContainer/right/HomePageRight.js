import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import Token from '../../../artifacts/contracts/Token.sol/Token.json';
import './homePageRight.css'
import SendCoin from './components/SendCoin';
import TransferCoin from './components/TransferCoin';
import ConfiscateCoin from './components/ConfiscateCoin';


import BaseButton from '../../BaseButton'

const HomePageRight = ({ tokenAddress, requestWallet }) => {
    const [symbol, setSymbol] = useState("");
    const [balanceOf, setBalanceOf] = useState("");
    const [receiverAccount, setReceiverAccount] = useState('');
    const [ownerAccount, setOwnerAccount] = useState('');
    const [amount, setAmount] = useState(0);

    const [sendCoinModal, setSendCoinModal] = useState(false);
    const [transferFromModal, setTransferFromModal] = useState(false);
    const [confiscateModal, setConfiscateModal] = useState(false);

    async function openSendCoinModal() {
        setSendCoinModal(true);
        setTransferFromModal(false);
        setConfiscateModal(false);
    }

    async function openTransferFromModal() {
        setTransferFromModal(true);
        setSendCoinModal(false);
        setConfiscateModal(false);
    }

    async function openConfiscateModal() {
        setConfiscateModal(true);
        setSendCoinModal(false);
        setTransferFromModal(false);
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
        console.log("start");
        try {
            console.log("start-1");
            if (typeof window.ethereum !== 'undefined') {
                await requestWallet()
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
                const transaction = await contract.transfer(receiverAccount, amount);
                await transaction.wait();

                const receiver = `${receiverAccount.substring(0, 6).concat('...')}${receiverAccount.slice(0, 4)}`;
                setSendCoinModal(!sendCoinModal);
                console.log(`${amount} Coins successfully sent to ${receiver}`);
            }
        } catch (error) {
            console.log(error)
            setSendCoinModal(!sendCoinModal)
        }
    }

    async function transferCoinFrom(e) {
        e.preventDefault();
        try {
            if (typeof window.ethereum !== 'undefined') {
                await requestWallet()
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
                const transaction = await contract.transferFrom(ownerAccount, receiverAccount, amount);
                await transaction.wait();
                
                const owner = `${ownerAccount.substring(0, 6).concat('...')}${ownerAccount.slice(0, 4)}`;
                const receiverFrom = `${receiverAccount.substring(0, 6).concat('...')}${receiverAccount.slice(0, 4)}`;
                setTransferFromModal(!transferFromModal);
                console.log(`${amount} coins successfully transferred from ${owner} to ${receiverFrom}`);
            }
        } catch (error) {
            console.log(error)
            setTransferFromModal(!transferFromModal);
        }
    }

    async function confiscateCoin(e) {
        e.preventDefault();
        try {
            if (typeof window.ethereum !== 'undefined') {
                await requestWallet()
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
                const transaction = await contract.confiscate(ownerAccount, amount);
                await transaction.wait();

                setConfiscateModal(!confiscateModal);
                const owner = `${ownerAccount.substring(0, 6).concat('...')}${ownerAccount.slice(0, 4)}`;
                console.log(`${amount} coins has successfully been confiscated from ${owner}`);
            }
        } catch (error) {
            console.log('error', error)
            setConfiscateModal(!confiscateModal);
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

                <div className={'mt-2 mt-lg-0'}>
                    <BaseButton
                        className={'open-modal-button cursor-pointer'}
                        text="Send Coins"
                        onClick={openSendCoinModal}
                    />

                    <BaseButton
                        className={'open-modal-button mt-2 cursor-pointer'}
                        text="Transfer Between Users"
                        onClick={openTransferFromModal}
                    />

                    <BaseButton
                        className={'open-modal-button mt-2 cursor-pointer'}
                        text="Confiscate Token"
                        onClick={openConfiscateModal}
                    />
                </div>

                {sendCoinModal && <SendCoin
                    setReceiverAccount={setReceiverAccount}
                    setAmount={setAmount}
                    setSendCoinModal={setSendCoinModal}
                    sendCoinModal={sendCoinModal}
                    sendCoins={sendCoins}
                />}
                
                {transferFromModal && <TransferCoin
                    setOwnerAccount={setOwnerAccount}
                    setReceiverAccount={setReceiverAccount}
                    setAmount={setAmount}
                    setTransferFromModal={setTransferFromModal}
                    transferFromModal={transferFromModal}
                    transferCoinFrom={transferCoinFrom}
                />}

                {confiscateModal && <ConfiscateCoin 
                    setOwnerAccount={setOwnerAccount}
                    setAmount={setAmount}
                    setConfiscateModal={setConfiscateModal}
                    confiscateModal={confiscateModal}
                    confiscateCoin={confiscateCoin}                
                />}
            </div>
        </section>
    )
}

export default HomePageRight
