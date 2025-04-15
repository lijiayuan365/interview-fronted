import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sub-next/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
  
    <iframe
      src="http://localhost:5002"
      className="w-full h-full border-none"
      title="next-app"
    />
  </>
}
