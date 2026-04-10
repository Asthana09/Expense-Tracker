import React from 'react';         // for jsx
import ReactDOM from 'react-dom/client';     //to rendr app in browser
//import './index.css';
import App from './App';                    //import main app component
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';           //enable routing (page navigation)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
  <BrowserRouter>
    <App />
  </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
