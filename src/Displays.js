import React, { useContext } from 'react';
import { CalculatorContext } from './CalculatorContext';
import { PropTypes } from 'prop-types';

export function InputScreen() {
  const { state } = useContext(CalculatorContext);
  let expression = [...state.expression].join('');
  let currentNumber;
  if (!state.expression.length) {
    currentNumber = state.currentNum;
  } else {
    if (state.currentNum != 0) {
      currentNumber = state.currentNum;
    }
  }
  return (
    <div id='display' className='input-display'>
      {expression}
      {state.negativeMultiplier == -1 && '-'}
      {currentNumber}
      {state.editingDecimal == true && state.currentNum % 1 == 0 && '.'}
    </div>
  );
}

export function ResultScreen({ result }) {
  return (
    <div id='result-display' className='result-display'>
      {result}
    </div>
  );
}

ResultScreen.propTypes = {
  result: PropTypes.number,
};
