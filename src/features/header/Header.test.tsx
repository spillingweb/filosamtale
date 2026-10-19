import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, onClick, style, ...props }: any) => (
    <a href={to} onClick={onClick} style={style} {...props}>{children}</a>
  ),
}))

vi.mock('#/components/ui/nav-link', () => ({
  NavLink: ({ children, to }: any) => <a href={to}>{children}</a>,
}))

vi.mock('./ThemeToggle', () => ({
  default: () => <button data-testid="theme-toggle">Theme</button>,
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

describe('Header', () => {
  it('renders the site logo', () => {
    render(<Header />)
    expect(screen.getByText('Filosamtale')).toBeInTheDocument()
  })

  it('renders all desktop navigation links', () => {
    render(<Header />)
    const desktopNav = screen.getByRole('navigation', { name: 'desktop' })
    expect(desktopNav).toBeInTheDocument()
    expect(screen.getByText('Om meg')).toBeInTheDocument()
    expect(screen.getByText('Tjenester')).toBeInTheDocument()
    expect(screen.getByText('Blogg')).toBeInTheDocument()
    expect(screen.getByText('Arrangementer')).toBeInTheDocument()
  })

  it('opens the mobile menu on hamburger click and sets aria-expanded', () => {
    render(<Header />)
    const hamburger = screen.getByRole('button', { name: /toggle menu/i })
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(hamburger)

    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'mobile' })).toBeInTheDocument()
  })

  it('closes the mobile menu on a second hamburger click', () => {
    render(<Header />)
    const hamburger = screen.getByRole('button', { name: /toggle menu/i })

    fireEvent.click(hamburger)
    fireEvent.click(hamburger)

    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: 'mobile' })).not.toBeInTheDocument()
  })
})
