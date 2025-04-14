import React from 'react';
import ReactDOM from 'react-dom/client';
import microApp from '@micro-zoe/micro-app'
import './index.css';
import App from './App';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
const router = createRouter({ routeTree });

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      {/* <App /> */}
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
microApp.start()
