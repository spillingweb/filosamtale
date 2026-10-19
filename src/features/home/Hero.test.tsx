import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>,
}))

vi.mock('tinacms/tina-field', () => ({
  tinaField: () => undefined,
}))

vi.mock('#/components/ui/button', () => ({
  Button: ({ children, asChild, ...props }: any) => {
    if (asChild) return children
    return <button {...props}>{children}</button>
  },
}))

vi.mock('#/components/ui/PageWrap', () => ({
  default: ({ children }: any) => <div>{children}</div>,
}))

vi.mock('#/components/ui/IslandKicker', () => ({
  default: ({ children }: any) => <span>{children}</span>,
}))

vi.mock('#/components/ui/DisplayHeading', () => ({
  DisplayHeading: ({ children, as: As = 'div', ...rest }: any) => <As {...rest}>{children}</As>,
}))

const mockPage = {
  kicker: 'Filosof og sykepleier',
  title: 'Samtaler som berører',
  subtitle: 'Jeg tilbyr filosofiske samtaler for privatpersoner og bedrifter.',
  heroImage: '/uploads/hero.jpg',
} as any

describe('Hero', () => {
  it('renders the main title', () => {
    render(<Hero page={mockPage} />)
    expect(screen.getByText('Samtaler som berører')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Hero page={mockPage} />)
    expect(screen.getByText(/filosofiske samtaler/i)).toBeInTheDocument()
  })

  it('renders the kicker text', () => {
    render(<Hero page={mockPage} />)
    expect(screen.getByText('Filosof og sykepleier')).toBeInTheDocument()
  })

  it('renders the hero image', () => {
    render(<Hero page={mockPage} />)
    expect(screen.getByRole('img', { name: /hero/i })).toBeInTheDocument()
  })

  it('renders navigation links to /tjenester and /om-meg', () => {
    render(<Hero page={mockPage} />)
    const links = screen.getAllByRole('link')
    const hrefs = links.map((l) => l.getAttribute('href'))
    expect(hrefs).toContain('/tjenester')
    expect(hrefs).toContain('/om-meg')
  })
})
