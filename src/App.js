import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import ConnectWallet from './pages/connectWallet/ConnectWallet'
import HomePage from './pages/homePage/HomePage'
import About from './pages/about/About'
import NotFound from './pages/404/404'

function App() {
  
  const currentAccount = true;
  return (
    <>
      {currentAccount ? (
        <ConnectWallet />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
