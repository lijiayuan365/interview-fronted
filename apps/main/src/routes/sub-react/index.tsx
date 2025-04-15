import { createFileRoute } from '@tanstack/react-router'
import WujieReact from 'wujie-react'
export const Route = createFileRoute('/sub-react/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <WujieReact
      name="react" 
      url="http://localhost:5004" 
      sync
    />
  </>
}
