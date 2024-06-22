
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FakeStackOverflow from './components/fakestackoverflow.js';

//ReactDOM.render(
  //<FakeStackOverflow />,
  //document.getElementById('root')
//);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FakeStackOverflow />
  </React.StrictMode>
);
