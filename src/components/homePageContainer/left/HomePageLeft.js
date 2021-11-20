import React from 'react'
import './homePageLeft.css'

const HomePageLeft = ({ currentAccount }) => {
    return (
        <section className={'main-container-left'}>
            <div className={'main-container-left-content'}>
                <h1 className={'wallet-address mt-2'}>
                    <span >Hello, {' '}</span>
                    {currentAccount.substring(0, 6).concat('...')}{currentAccount.slice(0, 4)}
                </h1>
                <p>
                    <span>AAToken</span> {" "}
                    is a token built on the ethereum blockchain using the ERC-20 standard,
                    and deployed on rinkeby test network.
                </p>
                <p>
                    <span>AAToken</span> {" "}
                    allows users send and receive token, without the interference of a central bank or government.
                    Instead, a network of thousands of peers is controlling the transactions; a decentralized system.
                </p>
                <span style={{fontSize: '16px'}}>
                    <strong>NOTE:</strong> This is not a token on Ethereum Mainnet, but on Rinkeby TestNet.
                </span>
            </div>
        </section>
    )
}

export default HomePageLeft
