import { createFileRoute } from '@tanstack/react-router'
import WujieReact from 'wujie-react'

export const Route = createFileRoute('/sub-nuxt/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <WujieReact
      name="nuxt" 
      url="http://localhost:5003" 
      sync
    />
  </>
}
