import React, {useState, useEffect} from 'react'

const studyCardList = (props) => {
    let flashCards = props.flashCards
    
    return(
        <div>
            {
                flashCards.map((card, index) => {
                    let [expanded, setExpanded] = useState(false)
                    return (
                        <li key={index}>
                            <div className="text-left flashCard-long">
                                <h3 className="flex-header">
                                    <span>
                                        <span>{card.word}</span>
                                        <span className="space-small">/</span>
                                        <span className="italics">{card.translation}</span>  
                                    </span>
                                    {
                                        !expanded && 
                                        <button onClick={ () => setExpanded(true) }>
                                            <i className="fa fa-solid fa-plus" />
                                        </button>
                                    }
                                    {
                                        expanded && 
                                        <button onClick={ () => setExpanded(false) }>
                                            <i className="fa fa-solid fa-minus" />
                                        </button>
                                    }
                                </h3>
                                {
                                    expanded &&
                                    <ul className="studyCard-sentence-list">
                                        {
                                            card.sentences && card.sentences.map((sentence, index) => {
                                                return (
                                                <li key={index}>
                                                    {sentence}
                                                </li>
                                                )
                                            })
                                        }
                                    </ul>
                                }
                            </div>
                        </li>
                    )
                })
            }
        </div>
    )
}

export default studyCardList