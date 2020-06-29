import React, { useState } from 'react';
// import logo from './logo.svg';
import useKeyPress from './components/useKeyPress';
// import { generate } from './utils/words';
// import { currentTime } from './utils/time';

import './App.css';

const initialWords = "སྟན་འཛིན་རྒྱལ་པོ།ཇཧཀ་ཀཇལཀཇ་ལཇལཀ་ཇ་ི་ིཇཇཧ་ྷགཇཧག་་ཇཧཀཇལ་ཧཇཀཧ་ཇ་ཇཧཀཇཧཀཇཧ་་་ོིོིིུུུ་་ཀཧཀཇཧ་ཇ";

function App() {
  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join(''),
  );
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));
  const [storeChars, setStoreChars] = useState('')
  const [error, setError] = useState(false)
  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);

  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState('');

  useKeyPress(key => {
    // if (!startTime) {
    //   setStartTime(currentTime());
    // }

    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;
    let updatestoreChars = storeChars;
    if (key === currentChar) {
      setError(false)
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }

      // when the characters have vowel, or rang-go lang-go 
      if(incomingChars.charCodeAt(0) >= 3953 & incomingChars.charCodeAt(0) < 4028){
        updatestoreChars += currentChar
        setStoreChars(updatestoreChars)
      }
      
      // when it is a new alphabet 
      if(incomingChars.charCodeAt(0) < 3953){
        setStoreChars("")
      }
      
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      setCurrentChar(incomingChars.charAt(0));

      updatedIncomingChars = incomingChars.substring(1);
      // if (updatedIncomingChars.split('་').length < 10) {
      //   updatedIncomingChars += ' ' + generate();
      // }
      setIncomingChars(updatedIncomingChars);

      // if (incomingChars.charAt(0) === '་') {
      //   setWordCount(wordCount + 1);
      //   // const durationInMinutes = (currentTime() - startTime) / 60000.0;
      //   setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
      // }
    }
    else{
      setError(true)
    }

    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);
    setAccuracy(
      ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(
        2,
      ),
    );
  });
  console.log("error: ", error)
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p className="Character">
          <span className="Character-out">
            {(leftPadding + outgoingChars).slice(-20)}
          </span>
          <span className={`${!error ? "Character-current" : "Character-error"}`}>{storeChars + currentChar}</span>
          <span>{incomingChars.substr(0, 20)}</span>
        </p>
        <h3>
          WPM: {wpm} | ACC: {accuracy}%
        </h3>
      </header>
    </div>
  );
}

export default App;
