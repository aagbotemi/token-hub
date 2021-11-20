import React from 'react';
import HomePageLeft from '../../components/homePageContainer/left/HomePageLeft';
import './homePage.css'

const HomePage = ({ currentAccount }) => {
    return (
        <main className={'d-grid items-center'}>
            <HomePageLeft 
                currentAccount={currentAccount}
            />

            <section>
                Hello
            </section>
        </main>
    )
}

export default HomePage
