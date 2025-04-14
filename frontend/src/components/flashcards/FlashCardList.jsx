import React, {useState, useEffect} from 'react'
import FlashCard from './FlashCard'
const FlashCardList = (props) => {
    console.log(props.flashCards)
    return (
        <span>
            <h3>Check out these random flash cards</h3>
            <hr />
            <div className="flash-cards-container">
                {
                    props.flashCards.map((card, index) => {
                        return(
                            <FlashCard key={index} card={card} />
                        
                        )
                    })
                }
            </div>
        </span>
    )
}
export default FlashCardList