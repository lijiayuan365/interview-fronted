import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import {
  HomeOutlined,
  FileAddOutlined
} from '@ant-design/icons'

const { Sider, Content } = Layout

const menuItems: MenuProps['items'] = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: <Link to="/">首页</Link>,
  },
  {
    key: '/big-file',
    icon: <FileAddOutlined />,
    label: <Link to="/big-file">大文件上传</Link>,
  },
]

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light">
        {/* <div style={{ height: 32, margin: 16, background: 'rgba(0, 0, 0, 0.2)' }} /> */}
        <Menu
          mode="inline"
          defaultSelectedKeys={['/']}
          style={{ borderRight: 0 }}
          items={menuItems}
        />
      </Sider>
      <Layout style={{ padding: '24px' }}>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
