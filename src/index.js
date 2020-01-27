import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const keys = [
    "1",
    "2ABC",
    "3DEF",
    "4GHI",
    "5JKL",
    "6MNO",
    "7PQRS",
    "8TUV",
    "9WXYZ",
    "",
    "0",
    "X"
 ];
ReactDOM.render(<App keypad={keys} />, document.getElementById('root'));
serviceWorker.unregister();
