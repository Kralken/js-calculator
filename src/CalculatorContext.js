import React, { useReducer, createContext } from 'react';
import { PropTypes } from 'prop-types';

//calculator states
export const initialState = {
  expression: [],
  currentNum: 0,
  negativeMultiplier: 1,
  editingDecimal: false,
  currentDecimalPlace: 10,
  status: 'EDITING',
};

const calculatorReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_NUMBER': {
      return {
        ...state,
        currentNum: state.currentNum * 10 + action.number,
      };
    }
    case 'clear': {
      return initialState;
    }
    case 'divide': {
      return {
        ...initialState,
        expression: [...state.expression, state.currentNum * state.negativeMultiplier, '/'],
      };
    }
    case 'multiply': {
      return {
        ...initialState,
        expression: [...state.expression, state.currentNum * state.negativeMultiplier, '*'],
      };
    }
    case 'subtract': {
      return {
        ...initialState,
        expression: [...state.expression, state.currentNum * state.negativeMultiplier, '-'],
      };
    }
    case 'NEGATE': {
      return {
        ...state,
        negativeMultiplier: -1,
      };
    }
    case 'add': {
      return {
        ...initialState,
        expression: [...state.expression, state.currentNum * state.negativeMultiplier, '+'],
      };
    }
    case 'equals': {
      return {
        ...state,
        status: 'SHOWING_RESULT',
      };
    }
    case 'decimal': {
      return {
        ...state,
        editingDecimal: true,
      };
    }
    case 'INPUT_DECIMAL': {
      return {
        ...state,
        currentNum: state.currentNum + action.number / state.currentDecimalPlace,
        currentDecimalPlace: state.currentDecimalPlace * 10,
      };
    }
    case 'USE_TOTAL': {
      return {
        ...initialState,
        expression: [
          eval([...state.expression, state.currentNum * state.negativeMultiplier].join('')),
          action.operation,
        ],
        status: 'EDITING',
      };
    }
    case 'DECIMAL_START': {
      return {
        ...initialState,
        editingDecimal: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

//context
export const CalculatorContext = createContext(null);

//wrapper
export default function CalculatorContextProvider({ children }) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>{children}</CalculatorContext.Provider>
  );
}
CalculatorContextProvider.propTypes = {
  children: PropTypes.node,
};
