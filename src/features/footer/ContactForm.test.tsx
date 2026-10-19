import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'

vi.mock('@tanstack/react-start', () => ({
  useServerFn: (fn: any) => fn,
}))

vi.mock('@tanstack/react-router', () => ({
  useSearch: () => ({}),
}))

vi.mock('tinacms/dist/react', () => ({
  tinaField: () => undefined,
}))

vi.mock('#/server/kontakt', () => ({
  sendKontaktskjema: vi.fn(),
}))

vi.mock('#/components/ui/IslandShell', () => ({
  default: ({ children }: any) => <div>{children}</div>,
}))

vi.mock('#/components/ui/IslandKicker', () => ({
  default: ({ children }: any) => <span>{children}</span>,
}))

vi.mock('#/components/ui/DisplayHeading', () => ({
  DisplayHeading: ({ children, as: As = 'div', ...rest }: any) => <As {...rest}>{children}</As>,
}))

import { sendKontaktskjema } from '#/server/kontakt'

const mockPage = {
  kicker: 'Kontakt',
  heading: 'Ta kontakt',
  description: 'Send meg en melding',
  addressLine1: 'Fevik',
  addressLine2: '4870 Fevik',
  addressLine3: null,
  email: 'test@filosamtale.no',
  phone: '+47 123 45 678',
} as any

describe('ContactForm', () => {
  beforeEach(() => {
    vi.mocked(sendKontaktskjema).mockClear()
  })

  it('renders all required form fields', () => {
    render(<ContactForm page={mockPage} />)
    expect(screen.getByLabelText(/navn/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-post/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/melding/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send melding/i })).toBeInTheDocument()
  })

  it('shows the success state after a successful submission', async () => {
    vi.mocked(sendKontaktskjema).mockResolvedValueOnce({ ok: true })
    render(<ContactForm page={mockPage} />)

    await userEvent.type(screen.getByLabelText(/navn/i), 'Ola Nordmann')
    await userEvent.type(screen.getByLabelText(/e-post/i), 'ola@test.no')
    await userEvent.type(screen.getByLabelText(/melding/i), 'Hei, jeg vil gjerne ta kontakt!')

    fireEvent.submit(screen.getByRole('button', { name: /send melding/i }).closest('form')!)

    await waitFor(() => {
      expect(screen.getByText(/meldingen er sendt/i)).toBeInTheDocument()
    })
  })

  it('shows the server error message after a failed submission', async () => {
    vi.mocked(sendKontaktskjema).mockResolvedValueOnce({ ok: false, feilmelding: 'Noe gikk galt på serveren.' })
    render(<ContactForm page={mockPage} />)

    await userEvent.type(screen.getByLabelText(/navn/i), 'Ola Nordmann')
    await userEvent.type(screen.getByLabelText(/e-post/i), 'ola@test.no')
    await userEvent.type(screen.getByLabelText(/melding/i), 'Hei!')

    fireEvent.submit(screen.getByRole('button', { name: /send melding/i }).closest('form')!)

    await waitFor(() => {
      expect(screen.getByText('Noe gikk galt på serveren.')).toBeInTheDocument()
    })
  })

  it('shows a fallback error message on an unexpected exception', async () => {
    vi.mocked(sendKontaktskjema).mockRejectedValueOnce(new Error('Network'))
    render(<ContactForm page={mockPage} />)

    await userEvent.type(screen.getByLabelText(/navn/i), 'Ola')
    await userEvent.type(screen.getByLabelText(/e-post/i), 'ola@test.no')
    await userEvent.type(screen.getByLabelText(/melding/i), 'Hei!')

    fireEvent.submit(screen.getByRole('button', { name: /send melding/i }).closest('form')!)

    await waitFor(() => {
      expect(screen.getByText(/noe gikk galt/i)).toBeInTheDocument()
    })
  })

  it('resets to the form when "Send ny melding" is clicked after success', async () => {
    vi.mocked(sendKontaktskjema).mockResolvedValueOnce({ ok: true })
    render(<ContactForm page={mockPage} />)

    await userEvent.type(screen.getByLabelText(/navn/i), 'Ola')
    await userEvent.type(screen.getByLabelText(/e-post/i), 'ola@test.no')
    await userEvent.type(screen.getByLabelText(/melding/i), 'Hei!')

    fireEvent.submit(screen.getByRole('button', { name: /send melding/i }).closest('form')!)

    await waitFor(() => screen.getByText(/meldingen er sendt/i))

    fireEvent.click(screen.getByRole('button', { name: /send ny melding/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /send melding/i })).toBeInTheDocument()
    })
  })
})
