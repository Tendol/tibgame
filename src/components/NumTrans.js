

export const NumTrans = (number) => {
  let numbers = number.toString()
  numbers = [...numbers]
  let tibNum = numbers.map(digit => 
   String.fromCharCode(digit.charCodeAt(0) + 3824)
  );

  const index = tibNum.length - 3
  if(tibNum.length > 2){
    if(tibNum[index].charCodeAt(0) === 3870){
      tibNum[index] = "."
    }
  }



  return tibNum
} 
