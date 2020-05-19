import React from "react";
import PropTypes from 'prop-types';

const EndScore = ({error, restart}) => {

  return (
    <div className="end-score">
      <h3> Incorrect: {error} </h3>
      <h2>Try Again</h2>
      <button className="restart-btn" onClick={restart}>
        Restart
      </button>
    </div>
  );
};

EndScore.propTypes = {
  error: PropTypes.number.isRequired,
  restart: PropTypes.func
};

export default EndScore;
