import React from 'react';
import HomePageLeft from '../../components/homePageContainer/left/HomePageLeft';
import HomePageRight from '../../components/homePageContainer/right/HomePageRight';
import './homePage.css'

const HomePage = ({ currentAccount, tokenAddress }) => {
    return (
        <main className={'d-grid items-center'}>
            <HomePageLeft 
                currentAccount={currentAccount}
            />

            <HomePageRight 
                tokenAddress={tokenAddress}
            />
        </main>
    )
}

export default HomePage
