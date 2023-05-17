import React from 'react';
import Calculator from './Calculator';
import CalculatorContextProvider from './CalculatorContext';
import Footer from './Footer';

export default function App() {
  return (
    <CalculatorContextProvider>
      <Calculator />
      <Footer />
    </CalculatorContextProvider>
  );
}
