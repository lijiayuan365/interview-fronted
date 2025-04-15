import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
const router = createRouter({ routeTree });
import SUB_APP_LIST from './enums/sub-app'
import WujieReact from 'wujie-react'

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

WujieReact.preloadApp({
  name: SUB_APP_LIST.VUE3.name,
  url: SUB_APP_LIST.VUE3.url,
  exec: true,
})

WujieReact.preloadApp({
  name: SUB_APP_LIST.NUXT.name,
  url: SUB_APP_LIST.NUXT.url,
  exec: true,
})

WujieReact.preloadApp({
  name: SUB_APP_LIST.REACT.name,
  url: SUB_APP_LIST.REACT.url,
  exec: true,
})



