import React, {useState} from "react";
import PropTypes from "prop-types";
import EndScore from "./EndScore";
import "./Board.css"



const Board = ({words})=>  {

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState('')
  const [matched, setMatched] = useState(false);
  const [error, setError] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value;
    const currentWord = words[currentWordIndex];
    // match last letter from current work and input work
    if (currentWord[input.length - 1] === input[input.length - 1]) {
      setInputValue(e.target.value)
      setMatched(true)

      if (currentWord === input){
        setCurrentWordIndex(currentWordIndex + 1);
        setInputValue("");

        // check if current word is last of words
        if (currentWordIndex === words.length - 1) {
          setFinished(true)
          setCurrentWordIndex(0);
        };
      };
    }
    else{
      setError(error + 1)
      setMatched(false)
    }
  };


  const letters = [...words[currentWordIndex]];

  const wordsToType = letters.map((letter, index) => {
    return letter === inputValue[index] ? (
      <span key={index} className="highlighted">{letter}</span>
    ) : (
      letter
    );
  });

  const restart = () =>{
    setFinished(false)
    setError(0)
  }

  return (
    <div className="wrapper">
      <h1>Tibetan Typing</h1>
      {!finished && <div className="wrapper-input">
      <h2 className="current-word">{wordsToType}</h2>
      <input
        type="text"
        placeholder="type here"
        value={inputValue}
        onChange={handleChange}
        className={`${!matched ? "trigger" : ""}`}
      />
      </div>}

      {finished && <EndScore error={error} restart={restart}/>}
    </div>
  ); 
};

Board.propTypes = {
  words: PropTypes.array.isRequired
};

export default Board;
