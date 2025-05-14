import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Sélectionne la div avec l'ID root dans index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Monte le composant App dans le DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
