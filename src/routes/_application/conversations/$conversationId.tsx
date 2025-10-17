import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_application/conversations/$conversationId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_application/conversations/conversationId"!</div>
}
