import { createFileRoute, redirect } from '@tanstack/react-router'

// Redirect all /admin/* routes to /admin
export const Route = createFileRoute('/admin/$')({
  ssr: false, // Disable SSR for admin routes
  beforeLoad: () => {
    throw redirect({ to: '/admin' })
  },
})
