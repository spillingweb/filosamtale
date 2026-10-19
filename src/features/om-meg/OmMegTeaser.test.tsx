import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import OmMegTeaser from './OmMegTeaser'

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

vi.mock('#/components/ui/IslandShell', () => ({
  default: ({ children }: any) => <div>{children}</div>,
}))

vi.mock('#/components/ui/IslandKicker', () => ({
  default: ({ children }: any) => <span>{children}</span>,
}))

vi.mock('#/components/ui/DisplayHeading', () => ({
  DisplayHeading: ({ children, as: As = 'div', ...rest }: any) => <As {...rest}>{children}</As>,
}))

const mockPage = {
  profileImage: '/uploads/profile.jpg',
  aboutName: 'Kari Nordmann',
  aboutText1: 'Jeg er sykepleier og filosof.',
  aboutText2: 'Jeg jobber med filosofiske samtaler.',
} as any

describe('OmMegTeaser', () => {
  it('renders the name', () => {
    render(<OmMegTeaser page={mockPage} />)
    expect(screen.getByText('Kari Nordmann')).toBeInTheDocument()
  })

  it('renders both about-text paragraphs', () => {
    render(<OmMegTeaser page={mockPage} />)
    expect(screen.getByText(/sykepleier og filosof/i)).toBeInTheDocument()
    expect(screen.getByText(/filosofiske samtaler/i)).toBeInTheDocument()
  })

  it('renders the profile image with the correct src', () => {
    render(<OmMegTeaser page={mockPage} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/uploads/profile.jpg')
  })

  it('renders a "Les mer om meg" link to /om-meg', () => {
    render(<OmMegTeaser page={mockPage} />)
    const link = screen.getByRole('link', { name: /les mer om meg/i })
    expect(link).toHaveAttribute('href', '/om-meg')
  })
})
