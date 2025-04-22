import { useLayoutEffect, useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { Card, Typography, Divider, Button, Space, Row, Col } from 'antd'
import { GithubOutlined, CloudOutlined, CodeOutlined, AppstoreOutlined } from '@ant-design/icons'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { Title, Paragraph, Text, Link } = Typography;

  const [count, setCount] = useState(0)
  const changeCount = () => {
    setCount(count + 1);
    // setCount(prev => {
    //   console.log(prev, 'prev1');
    //   return prev + 1;
    // });
    // setCount(prev => {
    //   console.log(prev, 'prev2');
    //   return prev + 1;
    // });
    return;
    setTimeout(() => {
      setCount(count + 1);
      setCount(count + 1);
      console.log(count, '1');
    }, 0);

    // console.log(count, '1');
    // setCount(prev => prev + 1);
    // console.log(count, '2');
    // setCount(count + 1);
    // setCount(count + 1);
  }
  // document.querySelector('button')?.addEventListener('click', () => {
  //   debugger;
  //   setCount(count + 1);
  //   console.log('===click==');
  //   setCount(count + 1);
  // });

  const goGithub = (url: string) => {
    window.open(url, '_blank');
  }
  useEffect(() => {
    console.log(count, 'count');
    return () => console.log('++++++', count)
  }, [count]);
  useLayoutEffect(() => {
    console.log(count, 'count layoutEffect');
    return () => console.log('=====', count)
  }, [count]);
  
  return (
    <div className="py-8 px-6">
      {/* <Button onClick={changeCount}>点击 {count}</Button> */}
      <Typography>
        <Title level={2} className="mb-6 text-center">无界微前端演示项目</Title>
        
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} md={12}>
            <Card 
              title={<Space><CloudOutlined /> 部署信息</Space>} 
              className="h-full shadow-sm hover:shadow-md transition-shadow"
            >
              <Paragraph>
                本项目使用赛博善人 <Text strong>Vercel</Text> 进行免费静态部署，国内网络访问可能受到一定影响。
              </Paragraph>
              <Paragraph>
                后端拉取项目本地运行，或者直接拉 docker(可能不是最新版本)
              </Paragraph>
              <Paragraph>
                docker run -d -p 3000:3000 lijiayuan/interview-backend
              </Paragraph>
              <Paragraph>
                后端接口文档地址：<a href="http://localhost:3000/api/docs" target="_blank" rel="noopener noreferrer">http://localhost:3000/api/docs</a>
              </Paragraph>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card 
              title={<Space><CodeOutlined /> 项目架构</Space>} 
              className="h-full shadow-sm hover:shadow-md transition-shadow"
            >
              <Paragraph>
                项目采用<Text strong>PNPM Workspace</Text>管理依赖，使用<Text strong>无界微前端</Text>技术实现应用集成。
              </Paragraph>
              <Paragraph>
                <Text type="secondary">注：实际微前端项目不建议将所有代码放在同一仓库，因为微前端本身就是为了解决巨石应用问题而设计的。本项目采用单仓纯粹是为了偷懒</Text>
                <Text className='block' type="secondary">注：无界在 Next.js 作为子应用的时候会加载不出来，<a href="https://github.com/Tencent/wujie/issues/894" target="_blank" rel="noopener noreferrer">issue</a>，顾这边这边 next 项目先用 iframe 代替</Text>
              </Paragraph>
            </Card>
          </Col>
        </Row>
        
        <Card 
          title={<Space><AppstoreOutlined /> 使用说明</Space>} 
          className="mb-8 shadow-sm hover:shadow-md transition-shadow"
        >
          <Paragraph>
            通过侧边栏可以切换到不同的微前端子应用，每个子应用均为独立部署，可独立运行。
          </Paragraph>
          <Paragraph>
            当前项目展示了React、Vue3、Next.js、Nuxt等不同技术栈的应用如何在同一框架下协同工作。
          </Paragraph>
          <Paragraph>
            根据心情持续更新中...
          </Paragraph>
        </Card>
        
        <Divider />
        
        <Space direction="vertical" className="w-full">
          <Space align="center" className="w-full justify-center">
            <Button className="p-2 mr-4" type="primary" icon={<GithubOutlined />} onClick={() => goGithub('https://github.com/lijiayuan365/interview-frontend')}>
              前端项目仓库
            </Button>
            <Button className="p-2" type="primary" icon={<GithubOutlined />} onClick={() => goGithub('https://github.com/lijiayuan365/interview-backend')}>
              后端项目仓库
            </Button>
          </Space>
        </Space>
      </Typography>
    </div>
  )
}
