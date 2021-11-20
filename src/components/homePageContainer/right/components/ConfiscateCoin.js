import React from 'react'
import BaseButton from '../../../BaseButton'

const ConfiscateCoin = ({
    setOwnerAccount,
    setAmount,
    setConfiscateModal,
    confiscateModal,
    confiscateCoin  
}) => {
    return (
        <div className={'modal'}>
            <div>
                <h3 style={{ color: '#41415a'}}>
                    Confiscate <span>AAToken</span> from an account
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
                        <label>Amount</label>
                        <input
                            onChange={e => setAmount(e.target.value)}
                            placeholder="0.00"
                        />
                    </div>

                    <div className={'modal-form-footer d-flex justify-between mt-2'}>
                        <BaseButton
                            text="Cancel"
                            onClick={() => setConfiscateModal(!confiscateModal)}
                        />
                        <BaseButton
                            text="Confiscate"
                            onClick={confiscateCoin}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ConfiscateCoin
