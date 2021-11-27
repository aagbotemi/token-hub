import React from 'react'
import BaseButton from '../../../BaseButton'
import { Spinner } from '../../../../components/spinner/Spinner'

const TransferCoin = ({
    setOwnerAccount,
    setReceiverAccount,
    setAmount,
    setTransferFromModal,
    transferFromModal,
    transferCoinFrom,
    isLoading
}) => {
    return (
        <div className={'modal'}>
            <div>
                <h3 style={{ color: '#41415a'}}>
                    Transfer <span>AAToken</span> between two accounts <br /> <span style={{fontSize: '12px'}}>Kindly append  18 0's to the amount you want to send, we are using 18 decimals.</span>
                </h3>

                <form>
                    <div className={'mt-1'}>
                        <label>Owner Account</label>
                        <input
                            onChange={e => setOwnerAccount(e.target.value)}
                            placeholder="0x000000000000000000000000"
                            autoFocus
                            disabled={isLoading}
                        />
                    </div>
                    <div className={'mt-1'}>
                        <label>Recipient Account</label>
                        <input
                            onChange={e => setReceiverAccount(e.target.value)}
                            placeholder="0x000000000000000000000000"
                            disabled={isLoading}
                        />
                    </div>
                    <div className={'mt-1'}>
                        <label>Amount</label>
                        <input
                            onChange={e => setAmount(e.target.value)}
                            placeholder="0.00"
                            disabled={isLoading}
                        />
                    </div>

                    <div className={'modal-form-footer d-flex justify-between mt-2'}>
                        <BaseButton
                            text="Cancel"
                            onClick={() => setTransferFromModal(!transferFromModal)}
                            isLoading={isLoading}
                        />
                        {
                            isLoading
                                ? <BaseButton
                                    text={<Spinner />}
                                    isLoading={isLoading}
                                />
                                : <BaseButton
                                    text="Transfer"
                                    onClick={transferCoinFrom}
                                />
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TransferCoin
