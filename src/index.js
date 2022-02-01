import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import FavoritesState from './contexts/FavoritesState';



ReactDOM.render(
  <React.StrictMode>
     <FavoritesState>
    <App />
    </FavoritesState>
  </React.StrictMode>,
  document.getElementById('root')
);
