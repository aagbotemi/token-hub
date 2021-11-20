import React from 'react'
import BaseButton from '../../../BaseButton'

const SendCoin = ({
    setReceiverAccount,
    setAmount,
    setSendCoinModal,
    sendCoinModal,
    sendCoins
}) => {
    return (
        <div className={'modal'}>
            <div>
                <h3 style={{ color: '#41415a'}}>
                    Transfer <span>AAToken</span>
                </h3>

                <form>

                    <div className={'mt-1'}>
                        <label>Recipient Account</label>
                        <input
                            onChange={e => setReceiverAccount(e.target.value)}
                            placeholder="0x000000000000000000000000"
                        />
                    </div>
                    <div className={'mt-1'}>
                        <label>Amount</label>
                        <input
                            onChange={e => setAmount(e.target.value)}
                            placeholder="0.00"
                        />
                    </div>
                    <div className={'modal-form-footer d-flex flex-wrap justify-between mt-2'}>
                        <BaseButton
                            text="Cancel"
                            onClick={() => setSendCoinModal(!sendCoinModal)}
                        />
                        <BaseButton
                            text="Send"
                            onClick={sendCoins}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SendCoin
