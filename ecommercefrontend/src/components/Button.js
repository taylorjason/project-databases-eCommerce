import React from 'react'

function Button(props) {
    return (
        <div>
           <button onClick = {() => props.setPage(props.page)}>{props.title}</button>
        </div>
    )
}

export default Button
