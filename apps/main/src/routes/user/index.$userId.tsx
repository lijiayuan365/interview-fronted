import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/user/index/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = useParams({ from: '/user/index/$userId' })
  console.log(userId)
  return <div>Hello "/user/index/$userId" {userId}!</div>
}
