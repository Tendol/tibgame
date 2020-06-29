import React, {useState} from "react";
import PropTypes from "prop-types";
import EndScore from "./EndScore";
import "./Board.css"



const Board = ({text})=>  {

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState('')
  const [matched, setMatched] = useState(false);
  const [error, setError] = useState(0);
  const [finished, setFinished] = useState(false);

  const wordsArray = text.split('་');
  const words = wordsArray.map(word => {return word+"་"})
  const handleChange = (e) => {
    const input = e.target.value;
    console.log("handle change input: ", input)
    const currentWord = words[currentWordIndex];
    console.log("current Word: ", currentWord)
    // match last letter from current work and input work
    if (currentWord[input.length - 1] === input[input.length - 1]) {
      console.log("entered")
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

  // console.log("inputValue: ", inputValue)
  const letters = [...text];
  // console.log("letters: ", letters)

  const wordsToType = letters.map((letter, index) => {
    // console.log("input Value: ", inputValue)
    // console.log("input: ", inputValue[index])
    // console.log("index: ", index)
    return letter == inputValue ? (
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
        name="inputValue"
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
  text: PropTypes.string.isRequired
};

export default Board;
