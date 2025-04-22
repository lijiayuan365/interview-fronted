// src/routes/__root.tsx
import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { MenuProps } from 'antd';
import type { ReactNode } from 'react';
import logo from '../assets/logo.svg';
const { Header, Content } = Layout;

interface RouteItem {
  key: string;
  path: string;
  label: string;
  icon: ReactNode;
}

export const Route = createRootRoute({
  component: () => {
    // 定义路由数组
    const routes: RouteItem[] = [
      {
        key: '1',
        path: '/',
        label: '首页',
        icon: <HomeOutlined />,
      },
      {
        key: '3',
        path: '/sub-vue3',
        label: 'vue3',
        icon: <UserOutlined />,
      },
      {
        key: '6',
        path: '/sub-react',
        label: 'react',
        icon: <UserOutlined />,
      },
      {
        key: '4',
        path: '/sub-next',
        label: 'next',
        icon: <UserOutlined />,
      },
      {
        key: '5',
        path: '/sub-nuxt',
        label: 'nuxt',
        icon: <UserOutlined />,
      }
    ];
    
    // 将路由数组转换为菜单项
    const menuItems: MenuProps['items'] = routes.map(route => ({
      key: route.key,
      icon: route.icon,
      label: <Link to={route.path}>{route.label}</Link>,
    }));
    
    return (
      <Layout className="min-h-screen h-screen">
        <Header style={{ padding: 0 }} className="flex items-center bg-white shadow">
          <div className="flex items-center">
            <Link to="/" className="flex items-center ml-8 mr-8">
              <img src={logo} alt="logo" className="w-8 h-8" />
            </Link>
            <Menu 
              mode="horizontal"
              defaultSelectedKeys={['1']} 
              items={menuItems}
              className="flex-1"
              theme='dark'
            />
          </div>
        </Header>
        <Content>
          <div className="h-full bg-white">
            <Outlet /> {/* 子路由渲染位置 */}
          </div>
        </Content>
      </Layout>
    );
  },
});