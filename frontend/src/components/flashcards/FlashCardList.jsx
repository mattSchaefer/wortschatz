import React, {useState, useEffect} from 'react'
import FlashCard from './FlashCard'
const FlashCardList = (props) => {
    console.log(props.flashCards)
    return (
        <div className="flash-cards-container">
            <h1>Check out these random flash cards</h1>
          
            {
                props.flashCards.map((card, index) => {
                    return(
                        <FlashCard key={index} card={card} />
                    
                    )
                })
            }
        </div>
    )
}

export default FlashCardList