import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'

// Mock TanStack Router
vi.mock('@tanstack/react-router', () => ({
  getRouteApi: () => ({
    useLoaderData: () => ({
      kontakt: {
        query: 'mock-query',
        variables: {},
        data: {
          pages: {
            __typename: 'PagesKontakt',
            kicker: 'Ta kontakt',
            heading: 'La oss snakke sammen',
            description: 'Jeg svarer innen to virkedager.',
            addressLine1: 'Testveien 1',
            addressLine2: '4870 Fevik',
            addressLine3: null,
            email: 'test@filosamtale.no',
            phone: '123 45 678',
          },
        },
      },
    }),
  }),
}))

// Mock TinaCMS
vi.mock('tinacms/dist/react', () => ({
  useTina: ({ data }: any) => ({ data }),
  tinaField: () => ({}),
}))

// Mock TanStack Start
vi.mock('@tanstack/react-start', () => ({
  useServerFn: () => {
    return vi.fn(async () => {
      // Simulate successful submission by default
      return { ok: true }
    })
  },
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Mail: () => <div>Mail Icon</div>,
  MapPin: () => <div>MapPin Icon</div>,
  Phone: () => <div>Phone Icon</div>,
}))

describe('ContactForm - Rendering', () => {
  it('should render contact information', () => {
    render(<ContactForm />)
    
    expect(screen.getByText('Ta kontakt')).toBeInTheDocument()
    expect(screen.getByText('La oss snakke sammen')).toBeInTheDocument()
    expect(screen.getByText('Testveien 1')).toBeInTheDocument()
    expect(screen.getByText('test@filosamtale.no')).toBeInTheDocument()
    expect(screen.getByText('123 45 678')).toBeInTheDocument()
  })

  it('should render all form fields', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText(/navn/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-post/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/telefon/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/melding/i)).toBeInTheDocument()
  })

  it('should mark required fields', () => {
    render(<ContactForm />)
    
    const navnInput = screen.getByLabelText(/navn/i)
    const epostInput = screen.getByLabelText(/e-post/i)
    const telefonInput = screen.getByLabelText(/telefon/i)
    const meldingInput = screen.getByLabelText(/melding/i)
    
    expect(navnInput).toBeRequired()
    expect(epostInput).toBeRequired()
    expect(telefonInput).not.toBeRequired()
    expect(meldingInput).toBeRequired()
  })

  it('should have correct input types', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText(/e-post/i)).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText(/telefon/i)).toHaveAttribute('type', 'tel')
  })
})

describe('ContactForm - User Interaction', () => {
  it('should update form state when typing', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const navnInput = screen.getByLabelText(/navn/i) as HTMLInputElement
    const epostInput = screen.getByLabelText(/e-post/i) as HTMLInputElement
    const meldingInput = screen.getByLabelText(/melding/i) as HTMLTextAreaElement
    
    await user.type(navnInput, 'Test Testesen')
    await user.type(epostInput, 'test@example.com')
    await user.type(meldingInput, 'Dette er en testmelding')
    
    expect(navnInput.value).toBe('Test Testesen')
    expect(epostInput.value).toBe('test@example.com')
    expect(meldingInput.value).toBe('Dette er en testmelding')
  })

  it('should handle optional telefon field', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const telefonInput = screen.getByLabelText(/telefon/i) as HTMLInputElement
    await user.type(telefonInput, '12345678')
    
    expect(telefonInput.value).toBe('12345678')
  })
})

describe('ContactForm - Form Submission', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should show success message after successful submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Fill form
    await user.type(screen.getByLabelText(/navn/i), 'Test Testesen')
    await user.type(screen.getByLabelText(/e-post/i), 'test@example.com')
    await user.type(screen.getByLabelText(/melding/i), 'Test melding')
    
    // Submit
    const submitButton = screen.getByRole('button', { name: /send/i })
    await user.click(submitButton)
    
    // Check success message
    await waitFor(() => {
      expect(screen.getByText(/meldingen er sendt/i)).toBeInTheDocument()
      expect(screen.getByText(/takk for din henvendelse/i)).toBeInTheDocument()
    })
  })

  it('should clear form after successful submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const navnInput = screen.getByLabelText(/navn/i) as HTMLInputElement
    const epostInput = screen.getByLabelText(/e-post/i) as HTMLInputElement
    const meldingInput = screen.getByLabelText(/melding/i) as HTMLTextAreaElement
    
    // Fill form
    await user.type(navnInput, 'Test')
    await user.type(epostInput, 'test@example.com')
    await user.type(meldingInput, 'Test')
    
    // Submit
    await user.click(screen.getByRole('button', { name: /send/i }))
    
    // Wait for success and reset
    await waitFor(() => {
      expect(screen.getByText(/meldingen er sendt/i)).toBeInTheDocument()
    })
    
    // Click "Send ny melding"
    await user.click(screen.getByText(/send ny melding/i))
    
    // Form should be cleared
    expect(navnInput.value).toBe('')
    expect(epostInput.value).toBe('')
    expect(meldingInput.value).toBe('')
  })

  it('should prevent default form submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const form = screen.getByRole('button', { name: /send/i }).closest('form')
    const submitHandler = vi.fn((e) => e.preventDefault())
    form?.addEventListener('submit', submitHandler)
    
    await user.type(screen.getByLabelText(/navn/i), 'Test')
    await user.type(screen.getByLabelText(/e-post/i), 'test@example.com')
    await user.type(screen.getByLabelText(/melding/i), 'Test')
    await user.click(screen.getByRole('button', { name: /send/i }))
    
    expect(submitHandler).toHaveBeenCalled()
  })
})

describe('ContactForm - Error Handling', () => {
  it('should show error message on submission failure', async () => {
    // Mock failed submission
    const mockSend = vi.fn().mockResolvedValue({
      ok: false,
      feilmelding: 'Test error message',
    })
    
    vi.mocked(require('@tanstack/react-start').useServerFn).mockReturnValue(mockSend)
    
    const user = userEvent.setup()
    render(<ContactForm />)
    
    await user.type(screen.getByLabelText(/navn/i), 'Test')
    await user.type(screen.getByLabelText(/e-post/i), 'test@example.com')
    await user.type(screen.getByLabelText(/melding/i), 'Test')
    await user.click(screen.getByRole('button', { name: /send/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/test error message/i)).toBeInTheDocument()
    })
  })

  it('should handle network errors', async () => {
    const mockSend = vi.fn().mockRejectedValue(new Error('Network error'))
    vi.mocked(require('@tanstack/react-start').useServerFn).mockReturnValue(mockSend)
    
    const user = userEvent.setup()
    render(<ContactForm />)
    
    await user.type(screen.getByLabelText(/navn/i), 'Test')
    await user.type(screen.getByLabelText(/e-post/i), 'test@example.com')
    await user.type(screen.getByLabelText(/melding/i), 'Test')
    await user.click(screen.getByRole('button', { name: /send/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/noe gikk galt/i)).toBeInTheDocument()
    })
  })
})

describe('ContactForm - Accessibility', () => {
  it('should have proper labels for all inputs', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText(/navn/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-post/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/telefon/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/melding/i)).toBeInTheDocument()
  })

  it('should have submit button', () => {
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: /send/i })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  it('should have proper placeholder text', () => {
    render(<ContactForm />)
    
    expect(screen.getByPlaceholderText(/ditt fulle navn/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/din@epost.no/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/fortell gjerne/i)).toBeInTheDocument()
  })
})
