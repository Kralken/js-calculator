import React, { useContext, useRef } from 'react';
import { InputScreen, ResultScreen } from './Displays';
import Buttons from './Buttons';
import { CalculatorContext } from './CalculatorContext';

export default function Calculator() {
  const { state } = useContext(CalculatorContext);
  //compute the result each input value
  const result = useRef(0);
  if (state.status == 'BEFORE_EDIT') {
    if (!state.expression.length) {
      result.current = 0;
    } else {
      result.current = eval([...state.expression].slice(0, state.expression.length - 1).join(' '));
    }
  } else {
    result.current = eval(
      [...state.expression, state.currentNum * state.negativeMultiplier].join(' '),
    );
  }
  //tracking the result
  console.log([...state.expression, state.currentNum * state.negativeMultiplier].join(' '));
  console.log(result.current);
  return (
    <div id='calculator' className='calculator'>
      <div className='screen'>
        <InputScreen result={result.current} />
        <ResultScreen result={result.current} />
      </div>
      <Buttons />
    </div>
  );
}
