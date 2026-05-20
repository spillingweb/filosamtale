import { createFileRoute, redirect } from '@tanstack/react-router'

/**
 * /kontakt redirects straight to the contact form in the footer.
 * The form lives at #kontakt on the home page.
 */
export const Route = createFileRoute('/kontakt')({
  loader: () => {
    throw redirect({ to: '/', hash: 'kontakt' })
  },
  component: () => null,
})
