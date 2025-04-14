import React, {useState, useEffect} from 'react'

const FlashCard = (props) => {
    let sentences = props.card.sentences
    let current_sentence_index = 0
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(current_sentence_index)
    const [currentSide, setCurrentSide] = useState("front")
    const [sentencesToggle, setSentencesToggle] = useState(false)
    
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
        console.log(sentencesToggle)
        if(currentSentenceIndex == sentences.length - 1)
            return
        if(!sentencesToggle){
            setSentencesToggle(true)
        }else{
            
           setCurrentSentenceIndex((prev) => { return prev + 1} )     
        }        
    }
    const sentenceCarousel = () => {
        console.log(sentences.length)
        return(
            <div className="sentence-button-container">
                {
                    sentencesToggle &&
                    <div className="sentence-container">
                        {sentences[currentSentenceIndex]}
                    </div>
                }
                <button onClick={(e) => nextSentenceClick(e)} className="next-sentence-button" disabled={!(sentences && sentences.length > 1)}>
                    z. Beispiel
                </button>
                
            </div>
        )
    }
    return (
        <div className="flashCard" onClick={(e) => toggleCurrentSide(e)}>
            {
                currentSide == "front" &&
                <div className="flashcard-inner-container">
                    <h3>
                        {props.card.word}
                    </h3>
                    {
                        sentenceCarousel(sentences)
                    }
                </div>
            }
            {
                currentSide == "back" &&
                <div className="flashcard-inner-container">
                    <h3>{props.card.translation}</h3>
                </div>
            }
        </div>
    )
}


export default FlashCard