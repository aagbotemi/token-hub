import {useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";
import ConnectWallet from './pages/connectWallet/ConnectWallet'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './pages/homePage/HomePage'
import About from './pages/about/About'
import NotFound from './pages/404/404'

import { toast } from 'react-toastify';

// const tokenAddress = "0x437c9558aC57D07BDa7050cf03379DfeA150C7aE";
const tokenAddress = "0xE6aC6F8179dFc95939BFD35AC6b945F678331E79";


function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [loadingWallet, setLoadingWallet] = useState(false);

  toast.configure({
    autoClose: 7000,
    draggable: true,
  });

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        // console.log("Make sure you have metamask!");
        toast.dismiss();
        toast.info("Make sure you have MetaMask!", {
          position: "top-right",
          pauseOnHover: true,
          draggable: false,
        });
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
      // console.log(error);
      console.log(error);
      toast.dismiss();
      toast.success(error.message, {
        position: "top-right",
        pauseOnHover: true,
        draggable: false,
      });
    }
  }

  const requestWallet = async () => {
    setLoadingWallet(true);
    try {
      const { ethereum } = window;

      if (!ethereum) {
        // console.log("Get MetaMask!");
        toast.dismiss();
        toast.info("Get MetaMask!", {
          position: "top-right",
          pauseOnHover: true,
          draggable: false,
        });
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);

      setCurrentAccount(accounts[0]);
      setLoadingWallet(false);

      toast.dismiss();
      toast.success("You're connected successfully", {
        position: "top-right",
        pauseOnHover: true,
        draggable: false,
      });
    } catch (error) {
      // console.log(error);
      setLoadingWallet(false);

      toast.dismiss();
      toast.error(error.message, {
        position: "top-right",
        pauseOnHover: true,
        draggable: false,
      });
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
            <Route path="/" element={<HomePage 
              currentAccount={currentAccount} 
              tokenAddress={tokenAddress} 
              requestWallet={requestWallet} 
            />} />
            <Route path="/about" element={<About/>} />
            <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
      )}
    </>
  );
}

export default App;
