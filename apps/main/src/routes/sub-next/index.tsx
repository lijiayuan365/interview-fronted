import { createFileRoute } from '@tanstack/react-router'
import SUB_APP_LIST from '../../enums/sub-app'

export const Route = createFileRoute('/sub-next/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
  
    <iframe
      src={SUB_APP_LIST.NEXT.url}
      className="w-full h-full border-none"
      title="next-app"
    />
  </>
}
