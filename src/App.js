import React, { useState } from 'react';
import Board from './components/Board';

import './App.css';

const initialWords = "པཔཔཔ་སྟན་འཛིན་རྒྱལ་པོ།ཇཧཀ་ཀཇལཀཇ་ལཇལཀ་ཇ་ི་ིཇཇཧ་ྷགཇཧག་་ཇཧཀཇལ་ཧཇཀཧ་ཇ་ཇཧཀཇཧཀཇཧ་་་ོིོིིུུུ་་ཀཧཀཇཧ་ཇ";

function App() {
  const [error, setError] = useState(false)
  const [wpm, setWpm] = useState(0);
  const [inputValue, setInputValue] = useState("")
  const [accuracy, setAccuracy] = useState(0);
  const [finished, setFinished] = useState(false)

  const inputHandler = (e) => {
    if(!error){
      setInputValue(e.target.value)
    }

    if(e.target.value[e.target.value.length - 1] === "་" || 
    e.target.value[e.target.value.length - 1] === "།"){
      setInputValue("")
    }
  }
   

  if(finished){
    return (
      <div className="App">
        <section className="App-header">
          <h2> Result</h2>
          <h3>
          WPM: {wpm} | ACC: {accuracy}%
        </h3>
          <button> Restart </button>
        </section>
      </div>
    )
  }

  return (
    <div className="App">
      <section className="App-header">
        <Board 
          initialWords = {initialWords} 
          matched={error => setError(error)}
          accuracy={accuracy => setAccuracy(accuracy)}
          finished={finished => setFinished(finished)}
          wpm={wpm=>setWpm(wpm)}
        />
        <div>
          <br/> 
          <input
            name="inputValue"
            type="text"
            placeholder="type here"
            className="InputBox"
            value={inputValue}
            onChange={inputHandler}
          />
        </div>
        <h3>
          WPM: {wpm} | ACC: {accuracy}%
        </h3>
      </section>
    </div>
  );
}

export default App;
