// https://interview-frontend-sub-nuxt.vercel.app
// https://interview-frontend-sub-next.vercel.app
// https://interview-frontend-sub-react.vercel.app
// https://interview-frontend-sub-vue3.vercel.app

// 判断是否为开发环境
const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

const SUB_APP_LIST = {
  VUE3: {
    name: 'vue3',
    url: isDev ? 'http://localhost:5001' : 'https://interview-frontend-sub-vue3.vercel.app',
  },
  NUXT: {
    name: 'nuxt',
    url: isDev ? 'http://localhost:5003' : 'https://interview-frontend-sub-nuxt.vercel.app',
  },
  NEXT: {
    name: 'next',
    url: isDev ? 'http://localhost:5002' : 'https://interview-frontend-sub-next.vercel.app',
  },
  REACT: {  
    name: 'react',
    url: isDev ? 'http://localhost:5004' : 'https://interview-frontend-sub-react.vercel.app',
  },
}

export default SUB_APP_LIST
