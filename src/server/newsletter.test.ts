import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

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

import '#/server/newsletter'

describe('subscribeToNewsLetter', () => {
  describe('inputValidator', () => {
    it('throws when email is missing', () => {
      expect(() => captured.validator!({})).toThrow('En gyldig e-postadresse er påkrevd')
    })

    it('throws when email lacks @', () => {
      expect(() => captured.validator!({ email: 'notanemail' }))
        .toThrow('En gyldig e-postadresse er påkrevd')
    })

    it('trims and lowercases the email', () => {
      const result = captured.validator!({ email: '  Test@Example.NO  ' }) as Record<string, unknown>
      expect(result.email).toBe('test@example.no')
    })

    it('defaults consentAccepted to false when not provided', () => {
      const result = captured.validator!({ email: 'test@test.no' }) as Record<string, unknown>
      expect(result.consentAccepted).toBe(false)
    })

    it('defaults name to empty string when not provided', () => {
      const result = captured.validator!({ email: 'test@test.no' }) as Record<string, unknown>
      expect(result.name).toBe('')
    })
  })

  describe('handler', () => {
    beforeEach(() => {
      process.env.BREVO_API_KEY = 'test-key'
      vi.mocked(global.fetch).mockClear()
    })

    afterEach(() => {
      delete process.env.BREVO_API_KEY
    })

    it('returns ok: false when BREVO_API_KEY is missing', async () => {
      delete process.env.BREVO_API_KEY
      const result = await captured.handler!({ data: { email: 'test@test.no', name: '' } }) as Record<string, unknown>
      expect(result.ok).toBe(false)
    })

    it('calls the Brevo contacts API and returns ok: true on success', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true } as Response)
      const result = await captured.handler!({ data: { email: 'test@test.no', name: 'Ola' } }) as Record<string, unknown>
      expect(result.ok).toBe(true)
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.brevo.com/v3/contacts',
        expect.objectContaining({ method: 'POST' }),
      )
    })

    it('returns ok: false when Brevo API responds with an error', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () => '',
      } as unknown as Response)
      const result = await captured.handler!({ data: { email: 'test@test.no', name: '' } }) as Record<string, unknown>
      expect(result.ok).toBe(false)
    })

    it('returns ok: false on network error', async () => {
      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))
      const result = await captured.handler!({ data: { email: 'test@test.no', name: '' } }) as Record<string, unknown>
      expect(result.ok).toBe(false)
    })
  })
})
