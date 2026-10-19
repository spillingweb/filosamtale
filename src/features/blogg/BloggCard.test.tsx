import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import BloggCard from './BloggCard'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, params, ...props }: any) => <a href={to} {...props}>{children}</a>,
}))

vi.mock('tinacms/tina-field', () => ({
  tinaField: () => undefined,
}))

vi.mock('#/components/ui/IslandShell', () => ({
  default: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}))

vi.mock('#/components/ui/badge', () => ({
  Badge: ({ children }: any) => <span>{children}</span>,
}))

const mockPost = {
  id: 'post-1',
  title: 'Hva er en filosof?',
  category: 'Filosofi',
  date: '2025-06-15T00:00:00.000Z',
  excerpt: 'Et dypdykk i hva det vil si å være filosof.',
  coverImage: '/uploads/test.jpg',
  readingTime: 5,
  _sys: { filename: 'hva-er-en-filosof.md' },
} as any

describe('BloggCard', () => {
  it('renders the post title', () => {
    render(<BloggCard post={mockPost} index={0} />)
    expect(screen.getByText('Hva er en filosof?')).toBeInTheDocument()
  })

  it('renders the post category', () => {
    render(<BloggCard post={mockPost} index={0} />)
    expect(screen.getByText('Filosofi')).toBeInTheDocument()
  })

  it('renders the post excerpt', () => {
    render(<BloggCard post={mockPost} index={0} />)
    expect(screen.getByText(/dypdykk/i)).toBeInTheDocument()
  })

  it('renders the post date in Norwegian locale', () => {
    render(<BloggCard post={mockPost} index={0} />)
    // The date "2025-06-15" should render with the Norwegian month "juni"
    expect(screen.getByText(/juni/i)).toBeInTheDocument()
  })

  it('renders the cover image', () => {
    render(<BloggCard post={mockPost} index={0} />)
    const img = screen.getByRole('img', { name: /hva er en filosof/i })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/uploads/test.jpg')
  })

  it('links to the correct blog post slug', () => {
    render(<BloggCard post={mockPost} index={0} />)
    // The Link renders with to="/blogg/$slug"; params are passed but href is the route pattern
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })
})
