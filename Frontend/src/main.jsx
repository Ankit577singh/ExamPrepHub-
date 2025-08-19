import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.jsx';
import { BrowserRouter } from 'react-router';
import { AppContextProvider } from './contextapi/AppContext.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
    <App></App>
    </AppContextProvider>
  </BrowserRouter>
)
