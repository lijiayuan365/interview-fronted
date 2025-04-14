import { createFileRoute } from '@tanstack/react-router'
import WujieReact from 'wujie-react'

export const Route = createFileRoute('/sub-vue3/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <WujieReact
      name="vue3" 
      url="http://localhost:5001" 
      sync
    />
  </>
}
