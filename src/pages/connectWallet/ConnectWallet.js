import React from 'react'
import Spinner from '../../components/spinner/Spinner'

import './connectWallet.css'

const ConnectWallet = ({ requestWallet, loadingWallet }) => {
  return (
    <section className={"connect-wallet d-flex"}>
      <div className={"connect-wallet-left d-flex justify-center items-center vh-100"}>
        <div className={"connect-wallet-left-content"}>
          AAToken
          <div className={'d-lg-none'}>
            <button disabled={loadingWallet} className="cursor-pointer" onClick={requestWallet}>

              {loadingWallet ? <Spinner /> : 'Connect Wallet 💳'}
            </button>
          </div>
        </div>
      </div>
      <div className={"connect-wallet-right d-none d-lg-block justify-center items-center"}>
        <button disabled={loadingWallet} className="cursor-pointer" onClick={requestWallet}>

          {loadingWallet ? <Spinner /> : 'Connect Wallet 💳'}
        </button>
      </div>
    </section>
  )
}

export default ConnectWallet
