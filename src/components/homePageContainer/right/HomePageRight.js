import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import Token from '../../../artifacts/contracts/Token.sol/Token.json';
import './homePageRight.css'
import SendCoin from './components/SendCoin';
import TransferCoin from './components/TransferCoin';
import ConfiscateCoin from './components/ConfiscateCoin';
import MintCoin from './components/MintCoin';
import TransactionHistory from './components/TransactionHistory';
import BaseButton from '../../BaseButton'

import { toast } from 'react-toastify';

const HomePageRight = ({ tokenAddress, requestWallet }) => {
    const [symbol, setSymbol] = useState("");
    const [balanceOf, setBalanceOf] = useState("");
    const [receiverAccount, setReceiverAccount] = useState('');
    const [ownerAccount, setOwnerAccount] = useState('');
    const [amount, setAmount] = useState(0);
    const [allTransactions, setAllTransactions] = useState([]);
    const [isLoadingSendCoin, setIsLoadingSendCoin] = useState(false);
    const [isLoadingTransferCoin, setIsLoadingTransferCoin] = useState(false);
    const [isLoadingConfiscateCoin, setIsLoadingConfiscateCoin] = useState(false);
    const [isLoadingMintCoin, setIsLoadingMintCoin] = useState(false);

    const [sendCoinModal, setSendCoinModal] = useState(false);
    const [transferFromModal, setTransferFromModal] = useState(false);
    const [confiscateModal, setConfiscateModal] = useState(false);
    const [mintModal, setMintModal] = useState(false);
    const [txnHistoryModal, setTnxHistoryModal] = useState(false);

    toast.configure({
        autoClose: 7000,
        draggable: true,
    });

    async function openSendCoinModal() {
        setSendCoinModal(true);
        setTransferFromModal(false);
        setConfiscateModal(false);
        setMintModal(false);
        setTnxHistoryModal(false);
    }

    async function openTransferFromModal() {
        setTransferFromModal(true);
        setSendCoinModal(false);
        setConfiscateModal(false);
        setMintModal(false);
        setTnxHistoryModal(false);
    }

    async function openConfiscateModal() {
        setConfiscateModal(true);
        setSendCoinModal(false);
        setTransferFromModal(false);
        setMintModal(false);
        setTnxHistoryModal(false);
    }

    async function openMintModal() {
        setMintModal(true);
        setSendCoinModal(false);
        setTransferFromModal(false);
        setConfiscateModal(false);
        setTnxHistoryModal(false);
    }

    async function openTnxHistoryModal() {
        setTnxHistoryModal(true);
        setSendCoinModal(false);
        setTransferFromModal(false);
        setConfiscateModal(false);
        setMintModal(false);
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
        setIsLoadingSendCoin(true);
        try {
            if (typeof window.ethereum !== 'undefined') {
                // await requestWallet()
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
                const transaction = await contract.transfer(receiverAccount, amount);
                await transaction.wait();
                getAllTransactions();
                
                setIsLoadingSendCoin(false);

                const receiver = `${receiverAccount.substring(0, 6).concat('...')}${receiverAccount.slice(0, 4)}`;
                setSendCoinModal(!sendCoinModal);
                // console.log(`${amount} Coins successfully sent to ${receiver}`);

                toast.dismiss();
                toast.success(`${amount} coins successfully sent to ${receiver}`, {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                });
            }
        } catch (error) {
            // console.log(error)
            setIsLoadingSendCoin(false);
            setSendCoinModal(!sendCoinModal)

            toast.dismiss();
            toast.error(error.message, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
            });
        }
    }

    async function transferCoinFrom(e) {
        e.preventDefault();
        setIsLoadingTransferCoin(true);
        try {
            if (typeof window.ethereum !== 'undefined') {
                // await requestWallet()
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
                const transaction = await contract.transferFrom(ownerAccount, receiverAccount, amount);
                await transaction.wait();
                
                setIsLoadingTransferCoin(false);
                
                const owner = `${ownerAccount.substring(0, 6).concat('...')}${ownerAccount.slice(0, 4)}`;
                const receiverFrom = `${receiverAccount.substring(0, 6).concat('...')}${receiverAccount.slice(0, 4)}`;
                setTransferFromModal(!transferFromModal);
                // console.log(`${amount} coins successfully transferred from ${owner} to ${receiverFrom}`);
                toast.dismiss();
                toast.success(`${amount} coins successfully transferred from ${owner} to ${receiverFrom}`, {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                });
            }
        } catch (error) {
            // console.log(error)
            setIsLoadingTransferCoin(false);
            setTransferFromModal(!transferFromModal);
            toast.dismiss();
            toast.error(error.message, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
            });
        }
    }

    async function confiscateCoin(e) {
        e.preventDefault();
        setIsLoadingConfiscateCoin(true);
        try {
            if (typeof window.ethereum !== 'undefined') {
                // await requestWallet()
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
                const transaction = await contract.confiscate(ownerAccount, amount);
                await transaction.wait();

                setIsLoadingConfiscateCoin(false);

                setConfiscateModal(!confiscateModal);
                const owner = `${ownerAccount.substring(0, 6).concat('...')}${ownerAccount.slice(0, 4)}`;
                // console.log(`${amount} coins has successfully been confiscated from ${owner}`);
                toast.dismiss();
                toast.success(`${amount} coins has successfully been confiscated from ${owner}`, {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                });
            }
        } catch (error) {
            // console.log('error', error);
            setIsLoadingConfiscateCoin(false);
            setConfiscateModal(!confiscateModal);
            toast.dismiss();
            toast.error(error.message, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
            });
        }
    }

    async function mintCoin(e) {
        e.preventDefault();
        setIsLoadingMintCoin(true);
        try {
            if (typeof window.ethereum !== 'undefined') {
                // await requestWallet()
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
                const transaction = await contract.mint(amount);
                await transaction.wait();
                
                setIsLoadingMintCoin(false);
                setMintModal(!mintModal)
                // console.log(`${amount} coins has successfully been minted`);
                toast.dismiss();
                toast.error(`${amount} coins has successfully been minted`, {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                });
            }
        } catch (error) {
            // console.log(error);
            setIsLoadingMintCoin(false);
            setMintModal(!mintModal);
            toast.dismiss();
            toast.error(error.message, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
            });
        }
    }

    const getAllTransactions = async () => {
        const { ethereum } = window;
        try {
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(tokenAddress, Token.abi, signer);

                const transactions = await contract.getAllTransactions();

                const transactionsCleaned = transactions.map(transaction => {
                    return {
                        address: transaction.to,
                        timestamp: new Date(transaction.timestamp * 1000),
                        value: transaction.value,
                    };
                });
                setAllTransactions(transactionsCleaned);
            } else {
                console.log("Ethereum object doesn't exist!")
            }
        } catch (error) {
            // console.log(error);
            toast.dismiss();
            toast.error(error.message, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
            });
        }
    }

    useEffect(() => {
        fetchTokenSymbol();
        fetchBalanceOfToken();
        getAllTransactions();
    }, [])

    return (
        <section className={'main-container-right'}>
            <div className={'top-info d-none d-lg-flex justify-between items-center main-container-right-sub-content'}>
                <div>1 {symbol} = $234</div>
                <div>
                    Total Value: {balanceOf / (10 ** 18)}
                </div>
                <BaseButton
                    className={'tnx-history-btn cursor-pointer'}
                    text="Transaction History"
                    onClick={openTnxHistoryModal}
                />
            </div>
            <div className={'main-container-right-content'}>
                <div className={'top-info d-flex d-lg-none justify-between items-center main-container-right-sub-content flex-wrap'}>
                    <div>1 {symbol} = $234</div>
                    <div>
                      Total Value: {balanceOf / (10 ** 18)}
                    </div>
                    <BaseButton
                        className={'tnx-history-btn cursor-pointer'}
                        text="Transaction History"
                        onClick={openTnxHistoryModal}
                    />
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

                    <BaseButton
                        className={'open-modal-button mt-2 cursor-pointer'}
                        text="Mint Token"
                        onClick={openMintModal}
                    />
                </div>

                {sendCoinModal && <SendCoin
                    setReceiverAccount={setReceiverAccount}
                    setAmount={setAmount}
                    setSendCoinModal={setSendCoinModal}
                    sendCoinModal={sendCoinModal}
                    sendCoins={sendCoins}
                    isLoading={isLoadingSendCoin}
                />}
                
                {transferFromModal && <TransferCoin
                    setOwnerAccount={setOwnerAccount}
                    setReceiverAccount={setReceiverAccount}
                    setAmount={setAmount}
                    setTransferFromModal={setTransferFromModal}
                    transferFromModal={transferFromModal}
                    transferCoinFrom={transferCoinFrom}
                    isLoading={isLoadingTransferCoin}
                />}

                {confiscateModal && <ConfiscateCoin
                    setOwnerAccount={setOwnerAccount}
                    setAmount={setAmount}
                    setConfiscateModal={setConfiscateModal}
                    confiscateModal={confiscateModal}
                    confiscateCoin={confiscateCoin}
                    isLoading={isLoadingConfiscateCoin}
                />}

                {mintModal && <MintCoin 
                    setAmount={setAmount}
                    setMintModal={setMintModal}
                    mintModal={mintModal}
                    mintCoin={mintCoin}
                    isLoading={isLoadingMintCoin}
                />}

                {txnHistoryModal && <TransactionHistory
                    allTransactions={allTransactions}
                    setTnxHistoryModal={setTnxHistoryModal}
                    txnHistoryModal={txnHistoryModal}
                />}
            </div>
        </section>
    )
}

export default HomePageRight
