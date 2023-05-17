import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App.js';
import './src/styles.scss';

// const root = createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );

// !!! have to change to old render to pass fcc test !!!
ReactDOM.render(<App />, document.getElementById('root'));
