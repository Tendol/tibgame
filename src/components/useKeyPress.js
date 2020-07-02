import { useState, useEffect } from 'react';

const useKeyPress = callback => {
  const [keyPressed, setKeyPressed] = useState();

  useEffect(() => {
    
    const downHandler = ({ key }) => {
      // check if the same key is pressed for too long 
      // this is done by keeping track of the keyPressed 
      if (keyPressed !== key && key.length === 1) {
        setKeyPressed(key);
        callback && callback(key);
      }
    };
    // When key is released 
    const upHandler = () => {
      setKeyPressed(null);
    };

    // initiate the event handlers
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
  
    // the clean up function ensures that there will only 
    // ever be one instance of the event listener
    // and will be removed when unmounted 
    return function cleanup() {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });
  
  return keyPressed;
};

export default useKeyPress;