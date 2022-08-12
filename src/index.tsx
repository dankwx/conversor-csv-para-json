import React from 'react';
import ReactDOM from 'react-dom/client';
import Conversor from './Conversor/conversor';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Conversor />
  </React.StrictMode>
);
