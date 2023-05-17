import React, { useContext } from 'react';
import { CalculatorContext } from './CalculatorContext';
import { PropTypes } from 'prop-types';

export function InputScreen({ result }) {
  const { state } = useContext(CalculatorContext);

  //manage wether to show current num or not, don't show when there are previous numbers and new number is expected
  //show 0 for the very first number
  let currentNumber;
  if (!state.expression.length) {
    currentNumber = state.currentNum;
  } else {
    if (state.status == 'EDITING' || state.status == 'SHOWING_RESULT') {
      currentNumber = state.currentNum;
    } else {
      currentNumber = '';
    }
  }
  let display;
  if (state.status != 'SHOWING_RESULT') {
    //show the previous entered numbers
    display = [...state.expression].join('');
    if (state.negativeMultiplier == -1) {
      display += '-';
    }
    if (state.currentDecimalPlace == 10) {
      display += currentNumber;
    } else {
      display += currentNumber.toFixed(state.currentDecimalPlace.toString().length - 2);
    }
    if (
      state.editingDecimal == true &&
      state.currentDecimalPlace == 10 &&
      state.currentNum % 1 == 0
    ) {
      display += '.';
    }
  } else {
    //show the result instead
    display = result;
  }
  return (
    <div id='display' className='input-display'>
      {display}
    </div>
  );
}

export function ResultScreen({ result }) {
  const { state } = useContext(CalculatorContext);

  return (
    <div id='result-display' className='result-display'>
      {state.status != 'SHOWING_RESULT' && `= ${result}`}
    </div>
  );
}

InputScreen.propTypes = {
  result: PropTypes.number,
};

ResultScreen.propTypes = {
  result: PropTypes.number,
};
