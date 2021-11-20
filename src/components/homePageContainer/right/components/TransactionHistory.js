import React from 'react'
import BaseButton from '../../../BaseButton'

const TransactionHistory = ({
    allTransactions,
    setTnxHistoryModal,
    txnHistoryModal
}) => {
    return (
        <div className={'modal'}>
            <div className={'d-flex items-center justify-between'}>
                <h3 style={{ color: '#41415a'}}>
                    Transaction History - {allTransactions.length}
                </h3>

                <BaseButton
                    className={'cursor-pointer'}
                    text="✖️"
                    onClick={() => setTnxHistoryModal(!txnHistoryModal)}
                />
            </div>


            <div className={'transaction-container mt-1'}>
                {allTransactions.length === 0 
                ? <div className={'message-list no-message-list py- text-center cursor-pointer'}> No transaction has been performed!!! </div>
                : allTransactions.map((transaction, index) => {
                    return (
                        <div key={index} className={'transaction-list cursor-pointer'}>
                            <div className={'ml-4'}>
                                <div className={'address'}>{transaction.address}</div>
                                <div className={'transaction'}>{transaction.value / (10 ** 18)} AAT</div>
                                
                            </div>
                            <div className={'date-time'}>{transaction.timestamp.toLocaleDateString()} - {transaction.timestamp.toLocaleTimeString()}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TransactionHistory
