import { createFileRoute } from '@tanstack/react-router'
import WujieReact from 'wujie-react'
import SUB_APP_LIST from '../../enums/sub-app'
export const Route = createFileRoute('/sub-nuxt/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <WujieReact
      name={SUB_APP_LIST.NUXT.name} 
      url={SUB_APP_LIST.NUXT.url} 
      sync
    />
  </>
}
