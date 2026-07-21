import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Footer from './components/Footer';
import Nav from './components/Nav';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <div className="flex flex-col min-h-screen"> 
        <Nav />
        <div id="google_translate_element"></div> 
        <App />
        <Footer className="mt-auto" /> 
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
