import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button, Card, Typography, Space, message } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

// GitHub用户信息类型
interface GitHubUser {
  login: string;  // 用户名
  name: string;   // 姓名
  email: string;  // 邮箱（可能为null）
  avatar_url: string;
}

function RouteComponent() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<GitHubUser | null>(null)
  
  // GitHub OAuth配置
  const githubClientId = 'Ov23liKe0IeWcNxxx3sz'
  const redirectUri = `http://127.0.0.1:3001/login/callback`
  const scope = 'user:email'
  
  // 获取GitHub用户信息
  const fetchGithubUser = async (accessToken: string) => {
    try {
      // 获取用户基本信息
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${accessToken}`
        }
      })
      
      if (!userResponse.ok) {
        throw new Error('获取用户信息失败')
      }
      
      const userData = await userResponse.json()
      
      // 获取用户邮箱信息（因为某些用户的邮箱是私密的）
      const emailResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `token ${accessToken}`
        }
      })
      
      if (emailResponse.ok) {
        const emails = await emailResponse.json()
        // 找到主要邮箱
        const primaryEmail = emails.find((email: any) => email.primary)
        if (primaryEmail) {
          userData.email = primaryEmail.email
        }
      }
      
      setUser(userData)
      console.log('GitHub用户信息:', userData)
      message.success(`欢迎，${userData.name || userData.login}!`)
    } catch (error) {
      console.error('获取用户信息错误:', error)
      message.error('获取用户信息失败')
    } finally {
      setLoading(false)
    }
  }
  
  // 使用授权码获取访问令牌
  const getAccessToken = async (code: string) => {
    try {
      // 注意：由于GitHub不支持CORS，通常这一步应该在后端完成
      // 这里我们假设有一个代理服务器来处理这个请求
      const tokenUrl = `https://your-backend-proxy/github/access_token?code=${code}&client_id=${githubClientId}`
      
      const response = await fetch(tokenUrl)
      
      if (!response.ok) {
        throw new Error('获取访问令牌失败')
      }
      
      const data = await response.json()
      return data.access_token
    } catch (error) {
      console.error('获取访问令牌错误:', error)
      message.error('获取访问令牌失败')
      return null
    }
  }
  
  const handleGithubLogin = () => {
    // 构建GitHub OAuth URL，确保URL编码正确
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(githubClientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`
    
    console.log('认证URL:', authUrl) // 调试用
    
    // 使用新窗口打开GitHub授权页面
    setLoading(true)
    const authWindow = window.open(authUrl, '_blank', 'width=800,height=600')
    
    // 监听消息处理授权回调
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      
      if (
        event.data && 
        typeof event.data === 'object' && 
        event.data.type === 'github-oauth-callback' && 
        event.data.code
      ) {
        // 处理授权码
        console.log('Received GitHub OAuth code:', event.data)
        
        // 关闭授权窗口
        if (authWindow && !authWindow.closed) {
          authWindow.close()
        }
        
        // 移除消息监听
        window.removeEventListener('message', handleMessage)
        
        // 获取访问令牌
        const accessToken = await getAccessToken(event.data.code)
        if (accessToken) {
          // 获取用户信息
          await fetchGithubUser(accessToken)
        } else {
          setLoading(false)
          message.error('登录失败')
        }
      }
    }
    
    window.addEventListener('message', handleMessage)
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card title="用户登录" style={{ width: 400 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {user ? (
            <div className="text-center">
              <div className="mb-4">
                <img 
                  src={user.avatar_url} 
                  alt={user.login}
                  className="rounded-full mx-auto" 
                  style={{ width: 80, height: 80 }} 
                />
              </div>
              <Typography.Title level={4}>{user.name || user.login}</Typography.Title>
              {user.email && <Typography.Paragraph>{user.email}</Typography.Paragraph>}
              <Button type="primary" onClick={() => setUser(null)}>退出登录</Button>
            </div>
          ) : (
            <>
              <Typography.Paragraph>
                请选择以下方式登录系统
              </Typography.Paragraph>
              
              <Button 
                type="primary" 
                icon={<GithubOutlined />} 
                size="large" 
                block
                onClick={handleGithubLogin}
                loading={loading}
              >
                使用GitHub登录
              </Button>
            </>
          )}
        </Space>
      </Card>
    </div>
  )
}
