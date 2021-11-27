import React from 'react'
import BaseButton from '../../../BaseButton'
import { Spinner } from '../../../../components/spinner/Spinner'

const MintCoin = ({
    setAmount,
    setMintModal,
    mintModal,
    mintCoin,
    isLoading
}) => {
    return (
        <div className={'modal'}>
            <div>
                <h3 style={{ color: '#41415a'}}>
                    Mint new <span>AAToken</span> <br /> <span style={{fontSize: '12px'}}>Kindly append  18 0's to the amount you want to mint, we are using 18 decimals.</span>
                </h3>

                <form>
                    <div className={'mt-1'}>
                        <label>Amount</label>
                        <input
                            onChange={e => setAmount(e.target.value)}
                            placeholder="0.00"
                            autoFocus
                            disabled={isLoading}
                        />
                    </div>

                    <div className={'modal-form-footer d-flex justify-between mt-2'}>
                        
                        <BaseButton
                            text="Cancel"
                            onClick={() => setMintModal(!mintModal)}
                            isLoading={isLoading}
                        />
                        {
                            isLoading
                                ? <BaseButton
                                    text={<Spinner />}
                                    isLoading={isLoading}
                                />
                                : <BaseButton
                                    text="Send"
                                    onClick={mintCoin}
                                />
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MintCoin;
