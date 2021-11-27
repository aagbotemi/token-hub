import React from 'react'

const BaseButton = ({ onClick, text, className, isLoading }) => {
    return <button disabled={isLoading} className={className}
    onClick={onClick}>{text}</button>
}

export default BaseButton
