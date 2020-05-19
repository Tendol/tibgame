import React, {useState} from "react";
import PropTypes from "prop-types";
import "./Board.css"



const Board = ({words})=>  {

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState('')
  const [matched, setMatched] = useState(false);

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
          setCurrentWordIndex(0);
        };
      };
    }
    else{
      setMatched(false)
    }
  };


  const letters = [...words[currentWordIndex]];

  const typedWord = letters.map((letter, index) => {
    return letter === inputValue[index] ? (
      <span className="highlighted">{letter}</span>
    ) : (
      letter
    );
  });

  return (
    <div className="wrapper">
      <h1>Tibetan Typing</h1>
      <div className="wrapper-input">
      <h2 className="current-word">{typedWord}</h2>
      <input
        type="text"
        placeholder="type here"
        value={inputValue}
        onChange={handleChange}
        className={`${!matched ? "trigger" : ""}`}
      />
      </div>
    </div>
  );
};

Board.propTypes = {
  words: PropTypes.array.isRequired
};


export default Board;
