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
                    Mint new <span>AAToken</span>
                </h3>

                <form>
                    <div className={'mt-1'}>
                        <label>Amount</label>
                        <input
                            onChange={e => setAmount(e.target.value)}
                            placeholder="0.00"
                        />
                    </div>

                    <div className={'modal-form-footer d-flex justify-between mt-2'}>
                        
                        <BaseButton
                            text="Cancel"
                            onClick={() => setMintModal(!mintModal)}
                        />
                        {
                            isLoading
                                ? <BaseButton
                                    text={<Spinner />}
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
