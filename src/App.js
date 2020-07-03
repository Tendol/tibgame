import React, { useState } from 'react';

import Board from './components/Board';
import {NumTrans} from "./components/NumTrans";

import './App.css';

const initialWords = "པཔཔཔ་སྟན་འཛིན་རྒྱལ་པོ།ཇཧཀ་ཀཇལཀཇ་ལཇལཀ་ཇ་ི་ིཇཇཧ་ྷགཇཧག་་ཇཧཀཇལ་ཧཇཀཧ་ཇ་ཇཧཀཇཧཀཇཧ་་་ོིོིིུུུ་་ཀཧཀཇཧ་ཇ";

function App() {
  const [error, setError] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const [finished, setFinished] = useState(false)
  const inputHandler = (e) => {
    if(!error){
      setInputValue(e.target.value);
    }

    if(e.target.value[e.target.value.length - 1] === "་" || 
    e.target.value[e.target.value.length - 1] === "།"){
      setInputValue("");
    }
  }
  if(accuracy > 0) {
    let num = NumTrans(accuracy)
    setAccuracy(num)
  }
  if(wpm > 0) {
    setWpm(NumTrans(wpm))
  }

  if(finished){
    return (
      <div className="App">
        <section className="Result-header">
          <div className="Heading"> མཐའ་སྡོམ།</div>
          <h1>WPM: {wpm} </h1>
          <h1> ACC: {accuracy}% </h1>
          <button className="retake-btn" onClick={()=>{setFinished(false); setInputValue("");}}>
            བསྐྱར་འབྲི།
          </button>
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
        <div className="InputBox">
          <input
            name="inputValue"
            type="text"
            autoComplete="off" // so the browser will not the dropdown list of previous typed inputs
            placeholder="འདིར་འབྲི།"
            value={inputValue}
            onChange={inputHandler}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
