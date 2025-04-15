import { createFileRoute } from '@tanstack/react-router'
import WujieReact from 'wujie-react'
import SUB_APP_LIST from '../../enums/sub-app'
export const Route = createFileRoute('/sub-vue3/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <WujieReact
      name={SUB_APP_LIST.VUE3.name} 
      url={SUB_APP_LIST.VUE3.url} 
      sync
    />
  </>
}
