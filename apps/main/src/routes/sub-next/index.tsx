import { createFileRoute } from '@tanstack/react-router'
import WujieReact from 'wujie-react'

export const Route = createFileRoute('/sub-next/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <WujieReact
      name="next" 
      sync
      url="http://localhost:5002"
    />
  </>
}
