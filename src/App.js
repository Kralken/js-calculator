import React from 'react';
import Calculator from './Calculator';
import CalculatorContextProvider from './CalculatorContext';

export default function App() {
  return (
    <CalculatorContextProvider>
      <Calculator />
    </CalculatorContextProvider>
  );
}
