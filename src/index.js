import React from 'react';
import ReactDOM from 'react-dom/client';
import { LanguageProvider } from './context/LanguageContext';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import './stylesheets/index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LanguageProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LanguageProvider>
);