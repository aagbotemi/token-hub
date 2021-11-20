import {useEffect, useState} from "react";
import { ethers } from 'ethers';
import { Routes, Route, Link } from "react-router-dom";
import Token from './artifacts/contracts/Token.sol/Token.json';
import ConnectWallet from './pages/connectWallet/ConnectWallet'
import Header from './components/header/Header'
import HomePage from './pages/homePage/HomePage'
import About from './pages/about/About'
import NotFound from './pages/404/404'

const tokenAddress = "0x437c9558aC57D07BDa7050cf03379DfeA150C7aE";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [loadingWallet, setLoadingWallet] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const requestWallet = async () => {
    setLoadingWallet(true);
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Get MetaMask!");
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);

      setCurrentAccount(accounts[0]);
      setLoadingWallet(false);
    } catch (error) {
      console.log(error);
      setLoadingWallet(false);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <>
      {!currentAccount ? (
        <ConnectWallet
          loadingWallet={loadingWallet}
          requestWallet={requestWallet} 
        />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage currentAccount={currentAccount} />} />
            <Route path="/about" element={<About/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
