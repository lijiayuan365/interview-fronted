/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as BigFileIndexImport } from './routes/big-file/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const BigFileIndexRoute = BigFileIndexImport.update({
  id: '/big-file/',
  path: '/big-file/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/big-file/': {
      id: '/big-file/'
      path: '/big-file'
      fullPath: '/big-file'
      preLoaderRoute: typeof BigFileIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/big-file': typeof BigFileIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/big-file': typeof BigFileIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/big-file/': typeof BigFileIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/big-file'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/big-file'
  id: '__root__' | '/' | '/big-file/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  BigFileIndexRoute: typeof BigFileIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  BigFileIndexRoute: BigFileIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/big-file/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/big-file/": {
      "filePath": "big-file/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
