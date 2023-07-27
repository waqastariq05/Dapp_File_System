import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DriveState from './Context/DriveState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DriveState>
      <App />
    </DriveState>
  </React.StrictMode>
);

