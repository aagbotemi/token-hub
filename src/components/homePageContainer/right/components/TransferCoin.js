import React from 'react'
import BaseButton from '../../../BaseButton'

const TransferCoin = ({
    setOwnerAccount,
    setReceiverAccount,
    setAmount,
    setTransferFromModal,
    transferFromModal,
    transferCoinFrom
}) => {
    return (
        <div className={'modal'}>
            <div>
                <h3 style={{ color: '#41415a'}}>
                    Transfer <span>AAToken</span> between two accounts
                </h3>

                <form>
                    <div className={'mt-1'}>
                        <label>Owner Account</label>
                        <input
                            onChange={e => setOwnerAccount(e.target.value)}
                            placeholder="0x000000000000000000000000"
                        />
                    </div>
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

                    <div className={'modal-form-footer d-flex justify-between mt-2'}>
                        <BaseButton
                            text="Cancel"
                            onClick={() => setTransferFromModal(!transferFromModal)}
                        />
                        <BaseButton
                            text="Transfer"
                            onClick={transferCoinFrom}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TransferCoin
