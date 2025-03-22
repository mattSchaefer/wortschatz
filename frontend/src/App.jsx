import { useState, useEffect, React } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("");
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
  const url_optrions_ran_lines = {
    url: "http://127.0.0.1:8000/api/get-random-lines",
    options: {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        num_lines: 10,
        which_file: "deu_news_2024_10K-words",
      })
    }
  }
  
  useEffect(() => {
    console.log("sending...")
    fetch(url_optrions_ran_lines.url, url_optrions_ran_lines.options)
      .then(response => response.json())
      .then(data => {
       console.log(data)
        setMessage((prev) => prev + JSON.stringify(data, null, 2, 2))
        
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Wortschatz</h1>
      <p className="mt-4 text-lg">{message || "Loading..."}</p>
    </div>
  );
}

export default App;