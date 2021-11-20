import React from 'react'

const BaseButton = ({ onClick, text, className }) => {
    return <button className={className}
    onClick={onClick}>{text}</button>
}

export default BaseButton
