// src/routes/__root.tsx
import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { Layout, Menu } from 'antd';
import { HomeOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { MenuProps } from 'antd';
import type { ReactNode } from 'react';

const { Sider, Content } = Layout;

interface RouteItem {
  key: string;
  path: string;
  label: string;
  icon: ReactNode;
}

export const Route = createRootRoute({
  component: () => {
    const [collapsed, setCollapsed] = useState(false);
    
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
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="h-8 mx-4 my-4 bg-opacity-20 bg-white" />
          <Menu 
            theme="dark" 
            defaultSelectedKeys={['1']} 
            mode="inline" 
            items={menuItems} 
          />
        </Sider>
        <Layout className="site-layout">
          <Content className="m-4">
            <div className="h-full bg-white">
              <Outlet /> {/* 子路由渲染位置 */}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  },
});