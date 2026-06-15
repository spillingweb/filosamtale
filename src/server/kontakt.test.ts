import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { sendKontaktskjema } from './kontakt'

describe('sendKontaktskjema - Input Validation', () => {
  const validPayload = {
    navn: 'Test Testesen',
    epost: 'test@example.com',
    telefon: '12345678',
    melding: 'Dette er en testmelding',
  }

  it('should validate and accept valid data', () => {
    const validator = sendKontaktskjema.$$inputValidator
    expect(() => validator(validPayload)).not.toThrow()
  })

  it('should reject missing navn', () => {
    const validator = sendKontaktskjema.$$inputValidator
    const payload = { ...validPayload, navn: '' }
    expect(() => validator(payload)).toThrow('Navn er påkrevd')
  })

  it('should reject missing epost', () => {
    const validator = sendKontaktskjema.$$inputValidator
    const payload = { ...validPayload, epost: '' }
    expect(() => validator(payload)).toThrow('Gyldig e-post er påkrevd')
  })

  it('should reject invalid epost (no @)', () => {
    const validator = sendKontaktskjema.$$inputValidator
    const payload = { ...validPayload, epost: 'invalid-email' }
    expect(() => validator(payload)).toThrow('Gyldig e-post er påkrevd')
  })

  it('should reject missing melding', () => {
    const validator = sendKontaktskjema.$$inputValidator
    const payload = { ...validPayload, melding: '' }
    expect(() => validator(payload)).toThrow('Melding er påkrevd')
  })

  it('should trim whitespace from inputs', () => {
    const validator = sendKontaktskjema.$$inputValidator
    const payload = {
      navn: '  Test Testesen  ',
      epost: '  test@example.com  ',
      telefon: '  12345678  ',
      melding: '  Test message  ',
    }
    const result = validator(payload)
    expect(result.navn).toBe('Test Testesen')
    expect(result.epost).toBe('test@example.com')
    expect(result.telefon).toBe('12345678')
    expect(result.melding).toBe('Test message')
  })

  it('should make telefon optional', () => {
    const validator = sendKontaktskjema.$$inputValidator
    const payload = { ...validPayload, telefon: '' }
    const result = validator(payload)
    expect(result.telefon).toBeUndefined()
  })
})

describe('sendKontaktskjema - Email Sending', () => {
  const mockFetch = vi.fn()
  
  beforeEach(() => {
    global.fetch = mockFetch as any
    mockFetch.mockClear()
    process.env.BREVO_API_KEY = 'test-api-key'
    process.env.CONTACT_TO_EMAIL = 'test@filosamtale.no'
    process.env.SENDER_EMAIL = 'noreply@filosamtale.no'
  })

  afterEach(() => {
    delete process.env.BREVO_API_KEY
    delete process.env.CONTACT_TO_EMAIL
    delete process.env.SENDER_EMAIL
  })

  it('should return error if BREVO_API_KEY is not set', async () => {
    delete process.env.BREVO_API_KEY
    
    const result = await sendKontaktskjema({
      data: {
        navn: 'Test',
        epost: 'test@example.com',
        melding: 'Test',
      },
    })

    expect(result.ok).toBe(false)
    expect(result.feilmelding).toContain('Konfigurasjonsfeil')
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('should send email with correct Brevo API call', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
    })

    const result = await sendKontaktskjema({
      data: {
        navn: 'Test Testesen',
        epost: 'test@example.com',
        telefon: '12345678',
        melding: 'Dette er en test',
      },
    })

    expect(result.ok).toBe(true)
    expect(mockFetch).toHaveBeenCalledTimes(1)
    
    const [url, options] = mockFetch.mock.calls[0]
    expect(url).toBe('https://api.brevo.com/v3/smtp/email')
    expect(options.method).toBe('POST')
    expect(options.headers['api-key']).toBe('test-api-key')
    
    const body = JSON.parse(options.body)
    expect(body.sender.email).toBe('noreply@filosamtale.no')
    expect(body.to[0].email).toBe('test@filosamtale.no')
    expect(body.replyTo.email).toBe('test@example.com')
    expect(body.subject).toContain('Test Testesen')
    expect(body.htmlContent).toContain('Test Testesen')
    expect(body.htmlContent).toContain('test@example.com')
    expect(body.htmlContent).toContain('12345678')
    expect(body.htmlContent).toContain('Dette er en test')
  })

  it('should escape HTML in user input', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
    })

    await sendKontaktskjema({
      data: {
        navn: '<script>alert("xss")</script>',
        epost: 'test@example.com',
        melding: '<img src=x onerror="alert(1)">',
      },
    })

    const body = JSON.parse(mockFetch.mock.calls[0][1].body)
    expect(body.htmlContent).not.toContain('<script>')
    expect(body.htmlContent).toContain('&lt;script&gt;')
    expect(body.htmlContent).not.toContain('<img src=')
    expect(body.htmlContent).toContain('&lt;img')
  })

  it('should handle Brevo API errors', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 400,
      text: async () => JSON.stringify({ message: 'Invalid API key' }),
    })

    const result = await sendKontaktskjema({
      data: {
        navn: 'Test',
        epost: 'test@example.com',
        melding: 'Test',
      },
    })

    expect(result.ok).toBe(false)
    expect(result.feilmelding).toContain('400')
  })

  it('should work without optional telefon field', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
    })

    const result = await sendKontaktskjema({
      data: {
        navn: 'Test',
        epost: 'test@example.com',
        melding: 'Test without phone',
      },
    })

    expect(result.ok).toBe(true)
    const body = JSON.parse(mockFetch.mock.calls[0][1].body)
    expect(body.htmlContent).not.toContain('<strong>Telefon:</strong>')
  })

  it('should handle network errors gracefully', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))

    await expect(
      sendKontaktskjema({
        data: {
          navn: 'Test',
          epost: 'test@example.com',
          melding: 'Test',
        },
      })
    ).rejects.toThrow()
  })

  it('should convert newlines in message to <br> tags', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
    })

    await sendKontaktskjema({
      data: {
        navn: 'Test',
        epost: 'test@example.com',
        melding: 'Line 1\nLine 2\nLine 3',
      },
    })

    const body = JSON.parse(mockFetch.mock.calls[0][1].body)
    expect(body.htmlContent).toContain('Line 1<br>Line 2<br>Line 3')
  })
})
