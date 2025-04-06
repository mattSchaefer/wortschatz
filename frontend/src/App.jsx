import { useState, useEffect, React, use } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRandomFlashCardHook } from './hooks/RandomFlashcardHook'
function App() {
  const [count, setCount] = useState(0)
  const [wordObjects, setWordObjects] = useState([]);
  //const [words, setWords] = useState([]);
  const url_options_single_words = {
    url: "http://127.0.0.1:8000/api/read-file", 
    options:{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        start: 400,
        end: 450,
        which_file: "deu_news_2024_10K-words"
      })
    }
  }
  const build_sentences_request = (words, limit) => {
    return {
      url: "http://127.0.0.1:8000/api/get-sentences-with-one-of",
      options: {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          words: words,
          limit: limit,
          which_file: "deu_news_2024_10K-sentences",
        })
      }
    }
  }
  const url_options_sentences = {
    url: "http://127.0.0.1:8000/api/get-sentences-with-one-of",
    options: {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        words: ["vier", "sechs", "sieben"],
        limit: 10,
        which_file: "deu_news_2024_10K-sentences",
      })
    }
  }
  // const url_optrions_ran_lines = {
  //   url: "http://127.0.0.1:8000/api/get-random-lines",
  //   options: {
  //     method:"POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       num_lines: 10,
  //       which_file: "deu_news_2024_10K-words",
  //     })
  //   }
  // }
  const [url_optrions_ran_lines, words, setWords, flashCards, setFlashCards] = useRandomFlashCardHook(10)

  const build_request_to_gpt = (text) => { 
    return {
      url: "http://127.0.0.1:8000/api/gpt-translate",
      options: {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: text,
          accept_multipe: true
        })
      }
    } 
  }
  useEffect(() => {
    console.log("sending...")
  }, []);
  useEffect(() => {
    if(words.length == 0) return

    let gpt_request = build_request_to_gpt(words[0])
    fetch(gpt_request.url, gpt_request.options)
      .then(response => response.json())
      .then(data => {
       //console.log(data)
        //setWordObjects((prev) => data.data)
        //console.log(data.data)
      })
      .catch(error => console.error("Error fetching data:", error))
    
    //get sentences containing the words
    //!!!!!!!!!!!!!!!!!!!!
    // let sentence_request = build_sentences_request(words, 20)
    // fetch(sentence_request.url, sentence_request.options)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log("sentence request data: ")
    //     console.log(data)
    //     setWordObjects((prev) => data.data)
    //     console.log(data.data)
    //   }).then(() => {
    //     console.log(wordObjects)
    //   })
    //   .catch(error => console.error("Error fetching data:", error));
    
    setTimeout(() => {
      console.log(flashCards)
    }, 4500)
  }, [words])
  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Wortschatz</h1>
     <ul className="word-list-ele">
        {/*
          Object.entries(wordObjects).map((wordObject, index) => {
            return (
              <li key={index}>
                <div className="text-left">
                  <h3>{wordObject[0]}</h3>
                  <ul>
                    {
                      wordObject[1]["sentences"].map((sentence, index) => {
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
        */}
        {
          flashCards.map((card, index) => {
            return (
              <li key={index}>
                <div className="text-left">
                  <h3>{card.word}</h3>
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
     </ul>
    </div>
  );
}

export default App;