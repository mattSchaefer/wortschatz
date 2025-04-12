import { useState, useEffect, React, use } from 'react'
import reactLogo from '../assets/react.svg'
import FlashCardList from './flashcards/FlashCardList'
import '../App.css'
import { useRandomFlashCardHook } from '../hooks/RandomFlashcardHook'
function App() {
  
  const [url_optrions_ran_lines, words, setWords, flashCards, setFlashCards] = useRandomFlashCardHook(10)

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Wortschatz</h1>
      <ul className="word-list-ele">
      <FlashCardList flashCards={flashCards} />
      {
        /*  
        {
          flashCards.map((card, index) => {
            return (
              <li key={index}>
                <div className="text-left">
                  <h3>
                    <span>
                      <span>{card.word}</span>
                      <span className="space-small">/</span>
                      <span className="italics">{card.translation}</span>  
                    </span>
                  </h3>
                  <ul>
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
                </div>
              </li>
            )
          })
        }
       */
      }
     </ul>
    </div>
  );
}

export default App;