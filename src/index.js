import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <div className='footer'>
      <p>Created by Rey</p>
    </div>
  </React.StrictMode>
);
