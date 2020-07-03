import React, { useState } from 'react';

import useKeyPress from './useKeyPress';
import { currentTime } from './Time';

import "./Board.css"

const time = 2000
const Board = ({initialWords, matched, accuracy, finished, wpm}) => {

  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join(''),
  );
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));
  const [storeChars, setStoreChars] = useState('');
  const [error, setError] = useState(false);
  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [typedChars, setTypedChars] = useState('');

  let mounted = true
  
    useKeyPress(key => {
      if (!startTime) {
        setStartTime(currentTime());
      }
    
      let updatedOutgoingChars = outgoingChars;
      let updatedIncomingChars = incomingChars;
      let updatedStoreChars = storeChars;
      if(mounted){
        if (key === currentChar) {
          setError(false);
          matched(false);
          if (leftPadding.length > 0) {
            setLeftPadding(leftPadding.substring(1));
          }
      
          // when the characters have vowel, or rang-go lang-go 
          if(incomingChars.charCodeAt(0) >= 3953 & incomingChars.charCodeAt(0) < 4028) {
            updatedStoreChars += currentChar;
            setStoreChars(updatedStoreChars);
          }
          
          // when it is a new alphabet 
          if(incomingChars.charCodeAt(0) < 3953) {
            setStoreChars("");
          }
          
          updatedOutgoingChars += currentChar;
          setOutgoingChars(updatedOutgoingChars);
      
          setCurrentChar(incomingChars.charAt(0));
      
          updatedIncomingChars = incomingChars.substring(1);
          // if (updatedIncomingChars.split('་').length < 10) {
          //   updatedIncomingChars += ' ' + generate();
          // }
          setIncomingChars(updatedIncomingChars);
      
          if (incomingChars.charAt(0) === '་' || incomingChars.charAt(0) === '།') {
            setWordCount(wordCount + 1);
          }
        }
        else{
          setError(true);
          matched(true);
        }
      }

      const updatedTypedChars = typedChars + key;
      setTypedChars(updatedTypedChars);


      if(currentTime() - startTime > time){
        const acc = ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(
              2,
            );
        accuracy(acc);
        wpm(wordCount);
        finished(true);
        return() => mounted = false;
      }
    });


 
  return (
    <div className="text-container">
      <div className="Character">
        <span className="Character-out">
          {(leftPadding + outgoingChars).slice(-22)}
        </span>
        <span className={`${!error ? "Character-current" : "Character-error"}`}>{storeChars + currentChar}</span>
        <span>{incomingChars.substr(0, 22)}</span>
      </div>
    </div>

  )
}

export default Board;