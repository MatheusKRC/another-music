import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import './CSS/login.css'
import './CSS/header.css'
import './CSS/search.css'
import './CSS/albuns.css'
import './CSS/album.css'
import './CSS/musics.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
