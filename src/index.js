import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Qr from './Qr';
import Dashboard from './Dashboard'
import reportWebVitals from './reportWebVitals';
import Menu from './Menu'
import Start from './Start'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Start />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
