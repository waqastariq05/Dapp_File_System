import React from 'react'
import '../Card/Card.css'

const Card = (props) => {
    return (
        <a href={props.link} target='_blank'>
            <div className="card">
                <img src={props.img} className="card-img-top" alt="img" />
            </div>
        </a>
    )
}

export default Card
