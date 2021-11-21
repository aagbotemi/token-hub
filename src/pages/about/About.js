import React from 'react'
import './about.css'
import Github from '../../assets/images/github.svg'
import LinkedIn from '../../assets/images/linkedin.svg'
import Twitter from '../../assets/images/twitter.svg'

const About = () => {
    return (
        <div className='about d-flex justify-center items-center'>
            <div className="about-container text-center">
                <h1><span role="img" aria-label="idea-emoji">💡</span></h1>

                <p>
                    Hi! my name is <span>Abiodun Awoyemi</span>, I build pixel perfect and responsive user interfaces
                    using JavaScript technologies like ReactJS and VueJS. I recently started coding smart contracts using solidity on ethereum blockchain development.
                </p>

                <div className={'about-social'}>
                    <a href={'https://www.linkedin.com/in/abiodun-awoyemi-1ab8b3165/'}
                    target={'_blank'}
                    rel={'noreferrer noopener'}
                    >
                        <img
                            src={LinkedIn}
                            alt={'linkedin'}
                            width={'30px'}
                        />
                    </a>
                    <a href={'https://github.com/aagbotemi'}
                        target={'_blank'}
                        rel={'noreferrer noopener'}
                        className={'mx-1'}
                    >

                    <img
                        src={Github}
                        alt={'github'}
                        width={'30px'}
                        className={'github'}
                    />
                    </a>
                    <a href={'https://twitter.com/_abiodunAwoyemi'}
                    target={'_blank'}
                    rel={'noreferrer noopener'}
                    >

                    <img
                        src={Twitter}
                        alt={'twitter'}
                        width={'30px'}
                    />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default About
