import React from 'react';
import ReactDOM from 'react-dom/client';
import microApp from '@micro-zoe/micro-app'
import App from './App';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
microApp.start()
