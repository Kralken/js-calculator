import React, { useContext } from 'react';
import { CalculatorContext } from './CalculatorContext';
import { PropTypes } from 'prop-types';

export default function Buttons() {
  return (
    <div id='buttons-area' className='buttons-area'>
      <Button id='clear' className='button button-clear button-one-by-two' value='AC' />
      <Button id='divide' className='button button-divide button-one-by-one' value='/' />
      <Button id='multiply' className='button button-multiply button-one-by-one' value='*' />
      <Button id='seven' className='button number button-seven button-one-by-one' value={7} />
      <Button id='eight' className='button number button-eight button-one-by-one' value={8} />
      <Button id='nine' className='button number button-seven button-one-by-one' value={9} />
      <Button id='subtract' className='button button-subtract button-one-by-one' value='-' />
      <Button id='four' className='button number button-four button-one-by-one' value={4} />
      <Button id='five' className='button number button-five button-one-by-one' value={5} />
      <Button id='six' className='button number button-six button-one-by-one' value={6} />
      <Button id='add' className='button button-add button-one-by-one' value='+' />
      <Button id='one' className='button number button-one button-one-by-one' value={1} />
      <Button id='two' className='button number button-two button-one-by-one' value={2} />
      <Button id='three' className='button number button-three button-one-by-one' value={3} />
      <Button id='zero' className='button number button-zero button-one-by-two' value={0} />
      <Button id='decimal' className='button button-decimal button-one-by-one' value='.' />
      <Button id='equals' className='button button-equals button-two-by-one' value='=' />
    </div>
  );
}

function Button({ id, className, value }) {
  const { state, dispatch } = useContext(CalculatorContext);

  //sends actions to the reducers when pressing the buttons based on the status of the calculator
  //all logic before sending actions are done here, keep the reducer purely for updating states
  const dispatcher = (id, value) => {
    //for pressing numbers
    if (typeof value === 'number') {
      if (state.status == 'SHOWING_RESULT') {
        dispatch({ type: 'clear' });
      }
      if (!state.editingDecimal) {
        dispatch({ type: 'INPUT_NUMBER', number: value });
      } else {
        dispatch({ type: 'INPUT_DECIMAL', number: value });
      }
    } else {
      //for pressing function buttons
      if (
        state.status == 'EDITING' ||
        (state.status == 'BEFORE_EDIT' && !state.expression.length)
      ) {
        switch (id) {
          case 'subtract':
            //check first if subract is used to denote negative or subract
            {
              if (state.currentNum == 0) {
                dispatch({ type: 'NEGATE' });
              } else {
                dispatch({ type: id });
              }
            }
            break;
          default: {
            dispatch({ type: id });
          }
        }
      } else if (state.status == 'SHOWING_RESULT') {
        //if status is 'SHOWING_RESULT' handle buttons differently
        switch (id) {
          case 'clear': {
            dispatch({ type: id });
            break;
          }
          case 'equals': {
            break;
          }
          case 'decimal':
            {
              dispatch({ type: 'DECIMAL_START' });
            }
            break;
          default: {
            dispatch({ type: 'USE_TOTAL', operation: value });
          }
        }
      } else {
        if (state.status == 'BEFORE_EDIT' && state.expression.length != 0) {
          switch (id) {
            case 'subtract':
              //check first if subract is used to denote negative or subract
              {
                if (state.currentNum == 0) {
                  dispatch({ type: 'NEGATE' });
                } else {
                  dispatch({ type: 'CHANGE_OPERATOR', operator: value });
                }
              }
              break;
            case 'clear': {
              dispatch({ type: id });
              break;
            }
            case 'equals': {
              dispatch({ type: id });
              break;
            }
            case 'decimal': {
              dispatch({ type: id });
              break;
            }
            default: {
              dispatch({ type: 'CHANGE_OPERATOR', operator: value });
            }
          }
        }
      }
    }
  };

  return (
    <div id={id} className={className} onClick={() => dispatcher(id, value)}>
      {value}
    </div>
  );
}

Button.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
