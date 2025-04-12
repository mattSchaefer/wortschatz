import React, {useState, useEffect} from 'react'

const FlashCard = (props) => {
    let sentences = props.card.sentences
    let current_sentence_index = 0
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(current_sentence_index)
    const [currentSide, setCurrentSide] = useState("front")
    const toggleCurrentSide = (e) => {
        console.log(e.target)
        if(e.target.className == "next-sentence-button"){
            setCurrentSentenceIndex((prev) => { return prev + 1} )
        }else{
            setCurrentSide((prev) => prev == "front" ? "back" : "front")
        }
    }
    const nextSentenceClick = (e) => {
        console.log(e.target)
        setCurrentSentenceIndex((prev) => { return prev + 1} )
    }
    return (
        <div className="flashCard" onClick={(e) => toggleCurrentSide(e)}>
            {
                currentSide == "front" &&
                <div>
                    <h3>
                        {props.card.word}
                    </h3>
                    <div>
                        {sentences[currentSentenceIndex]}
                    </div>
                    
                </div>
            }
            {
                currentSide == "back" &&
                <div>
                    <span>{props.card.translation}</span>
                </div>
            }
            <button onClick={(e) => nextSentenceClick(e)} className="next-sentence-button">
                        naechstes Saetze
            </button>
        </div>
    )
}

export default FlashCard