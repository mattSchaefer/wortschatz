import { useState, useEffect, React, use } from 'react'
import reactLogo from '../assets/react.svg'
import FlashCardList from './flashcards/FlashCardList'
import StudyCardList from './flashcards/StudyCardList'
import '../App.css'
import { useRandomFlashCardHook } from '../hooks/RandomFlashcardHook'
function App() {
  
  const [url_optrions_ran_lines, words, setWords, flashCards, setFlashCards] = useRandomFlashCardHook(10)
  const [view, setView] = useState("flashCards")
  return (
    <div className="studyCard-list-outer">{/*p-10 text-center*/}
      <h1 className="font-bold">Wortschatz Aktuell</h1>{/* text-2xl  */}
      <div className="flex flex-row justify-center">{/*gap-4 mt-10*/}
        <button className="btn btn-primary" onClick={() => setView("flashCards")}>Flashcards</button>
        <button className="btn btn-primary" onClick={() => setView("list")}>Word List</button>
        </div>
      
        {
          view == "flashCards" &&
          <ul className="word-list-ele">
            <FlashCardList flashCards={flashCards} />
          </ul>
        }
        {
          view == "list" &&
          <ul className="word-list-ele-long">
            <StudyCardList flashCards={flashCards} />
          </ul>
        }
     
    </div>
  );
}

export default App;