import { createFileRoute } from '@tanstack/react-router'
import WujieReact from 'wujie-react'
import SUB_APP_LIST from '../../enums/sub-app'
export const Route = createFileRoute('/sub-react/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <WujieReact
      name={SUB_APP_LIST.REACT.name} 
      url={SUB_APP_LIST.REACT.url} 
      sync
    />
  </>
}
