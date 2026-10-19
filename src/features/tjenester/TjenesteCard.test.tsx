import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TjenesteCard from './TjenesteCard'

vi.mock('tinacms/tina-field', () => ({
  tinaField: () => undefined,
}))

vi.mock('tinacms/dist/rich-text', () => ({
  TinaMarkdown: () => null,
}))

vi.mock('#/components/ui/badge', () => ({
  Badge: ({ children }: any) => <span>{children}</span>,
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

vi.mock('#/components/ui/button', () => ({
  Button: ({ children, asChild, ...props }: any) => {
    if (asChild) return children
    return <button {...props}>{children}</button>
  },
}))

const mockTjeneste = {
  _sys: { filename: 'filosofisk-samtale.json' },
  tittel: 'Filosofisk samtale',
  undertittel: 'For privatpersoner',
  badge: 'Populær',
  image: null,
  description: { type: 'root', children: [] },
  detaljer: ['1 time per sesjon', 'Online eller fysisk'],
  priser: [
    { label: 'Enkelttime', pris: '700 kr' },
    { label: 'Pakke (5 timer)', pris: '3 000 kr' },
  ],
} as any

describe('TjenesteCard', () => {
  it('renders the service title', () => {
    render(<TjenesteCard tjeneste={mockTjeneste} />)
    expect(screen.getByText('Filosofisk samtale')).toBeInTheDocument()
  })

  it('renders the badge when provided', () => {
    render(<TjenesteCard tjeneste={mockTjeneste} />)
    expect(screen.getByText('Populær')).toBeInTheDocument()
  })

  it('renders service detail items', () => {
    render(<TjenesteCard tjeneste={mockTjeneste} />)
    expect(screen.getByText('1 time per sesjon')).toBeInTheDocument()
    expect(screen.getByText('Online eller fysisk')).toBeInTheDocument()
  })

  it('renders prices with their labels', () => {
    render(<TjenesteCard tjeneste={mockTjeneste} />)
    expect(screen.getByText('Enkelttime')).toBeInTheDocument()
    expect(screen.getByText('700 kr')).toBeInTheDocument()
    expect(screen.getByText('3 000 kr')).toBeInTheDocument()
  })

  it('renders a booking link to #kontakt', () => {
    render(<TjenesteCard tjeneste={mockTjeneste} />)
    const bookingLink = screen.getByRole('link', { name: /book time/i })
    expect(bookingLink).toHaveAttribute('href', '#kontakt')
  })
})
