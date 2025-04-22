import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Spin, Typography, Result } from 'antd'

export const Route = createFileRoute('/login/callback')({
  component: CallbackComponent,
})

function CallbackComponent() {
  useEffect(() => {
    // 获取URL中的授权码
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const error = urlParams.get('error')
    
    if (error) {
      console.error('GitHub授权错误:', error)
      // 3秒后关闭窗口
      setTimeout(() => {
        window.close()
      }, 3000)
      return
    }
    
    if (code) {
      // 将授权码发送到父窗口
      window.opener.postMessage(
        { 
          type: 'github-oauth-callback', 
          code 
        }, 
        window.location.origin
      )
      
      // 延迟一会儿再关闭窗口，确保消息已被接收
      setTimeout(() => {
        window.close()
      }, 1000)
    } else {
      console.error('未收到授权码')
      // 3秒后关闭窗口
      setTimeout(() => {
        window.close()
      }, 3000)
    }
  }, [])
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <Spin size="large" />
        <Typography.Title level={4} className="mt-4">
          正在处理GitHub授权...
        </Typography.Title>
        <Typography.Paragraph className="mt-2">
          授权完成后窗口将自动关闭
        </Typography.Paragraph>
      </div>
    </div>
  )
} 