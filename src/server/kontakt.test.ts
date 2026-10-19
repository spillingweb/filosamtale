import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Capture the validator and handler as the module-level createServerFn chain runs at import time.
const captured = vi.hoisted(() => ({
  validator: null as ((data: unknown) => unknown) | null,
  handler: null as ((ctx: { data: unknown }) => Promise<unknown>) | null,
}))

vi.mock('@tanstack/react-start', () => ({
  createServerFn: () => ({
    inputValidator: (fn: (data: unknown) => unknown) => {
      captured.validator = fn
      return {
        handler: (fn: (ctx: { data: unknown }) => Promise<unknown>) => {
          captured.handler = fn
          return {}
        },
      }
    },
  }),
}))

// Side-effect import triggers createServerFn, populating captured.validator / captured.handler
import '#/server/kontakt'

describe('sendKontaktskjema', () => {
  describe('inputValidator', () => {
    it('throws when navn is missing', () => {
      expect(() => captured.validator!({ epost: 'test@test.no', melding: 'Hei' }))
        .toThrow('Navn er påkrevd')
    })

    it('throws when navn is only whitespace', () => {
      expect(() => captured.validator!({ navn: '   ', epost: 'test@test.no', melding: 'Hei' }))
        .toThrow('Navn er påkrevd')
    })

    it('throws when epost lacks @', () => {
      expect(() => captured.validator!({ navn: 'Test', epost: 'notanemail', melding: 'Hei' }))
        .toThrow('Gyldig e-post er påkrevd')
    })

    it('throws when melding is missing', () => {
      expect(() => captured.validator!({ navn: 'Test', epost: 'test@test.no' }))
        .toThrow('Melding er påkrevd')
    })

    it('trims whitespace from navn, epost, and melding', () => {
      const result = captured.validator!({ navn: '  Ola  ', epost: '  ola@test.no  ', melding: '  Hei  ' })
      expect(result).toMatchObject({ navn: 'Ola', epost: 'ola@test.no', melding: 'Hei' })
    })

    it('sets telefon to undefined when blank', () => {
      const result = captured.validator!({
        navn: 'Ola', epost: 'ola@test.no', melding: 'Hei', telefon: '  ',
      }) as Record<string, unknown>
      expect(result.telefon).toBeUndefined()
    })

    it('preserves telefon when provided', () => {
      const result = captured.validator!({
        navn: 'Ola', epost: 'ola@test.no', melding: 'Hei', telefon: '12345678',
      }) as Record<string, unknown>
      expect(result.telefon).toBe('12345678')
    })
  })

  describe('handler', () => {
    const validData = { navn: 'Ola', epost: 'ola@test.no', melding: 'Hei' }

    beforeEach(() => {
      process.env.BREVO_API_KEY = 'test-key'
      process.env.CONTACT_TO_EMAIL = 'to@test.no'
      process.env.SENDER_EMAIL = 'from@test.no'
      vi.mocked(global.fetch).mockClear()
    })

    afterEach(() => {
      delete process.env.BREVO_API_KEY
    })

    it('returns ok: false with config error when BREVO_API_KEY is missing', async () => {
      delete process.env.BREVO_API_KEY
      const result = await captured.handler!({ data: validData }) as Record<string, unknown>
      expect(result.ok).toBe(false)
      expect(result.feilmelding as string).toContain('Konfigurasjonsfeil')
    })

    it('calls the Brevo SMTP API and returns ok: true on success', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true } as Response)
      const result = await captured.handler!({ data: validData }) as Record<string, unknown>
      expect(result.ok).toBe(true)
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.brevo.com/v3/smtp/email',
        expect.objectContaining({ method: 'POST' }),
      )
    })

    it('returns ok: false when the Brevo API responds with an error status', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => '',
      } as unknown as Response)
      const result = await captured.handler!({ data: validData }) as Record<string, unknown>
      expect(result.ok).toBe(false)
    })

    it('sets replyTo to the submitter email and name', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true } as Response)
      await captured.handler!({ data: validData })
      const [, init] = vi.mocked(global.fetch).mock.calls[0]
      const body = JSON.parse((init as RequestInit).body as string)
      expect(body.replyTo).toMatchObject({ email: 'ola@test.no', name: 'Ola' })
    })
  })
})
