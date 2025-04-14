// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-screen bg-gray-100">
      <nav>
        <a className='w-64 block' href="/">Home</a>
        <a className='w-64 block' href="/about">About</a>
        <a className='w-64 block' href="/user/index/123">User</a>
      </nav>
      <Outlet /> {/* 子路由渲染位置 */}
    </div>
  ),
});