import React, { useContext, useRef } from 'react';
import { InputScreen, ResultScreen } from './Displays';
import Buttons from './Buttons';
import { CalculatorContext } from './CalculatorContext';

export default function Calculator() {
  const { state } = useContext(CalculatorContext);
  //compute the result each input value
  const result = useRef(0);
  result.current = eval(
    [...state.expression, state.currentNum * state.negativeMultiplier].join(''),
  );
  //tracking the result
  console.log(result.current);
  return (
    <div id='calculator' className='calculator'>
      <InputScreen />
      <ResultScreen result={result.current} />
      <Buttons />
    </div>
  );
}
