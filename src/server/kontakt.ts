import { createServerFn } from '@tanstack/react-start'

interface KontaktPayload {
  navn: string
  epost: string
  telefon?: string
  melding: string
}

interface KontaktResult {
  ok: boolean
  feilmelding?: string
}

export const sendKontaktskjema = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown): KontaktPayload => {
    const d = data as Record<string, string>
    if (!d.navn?.trim()) throw new Error('Navn er påkrevd')
    if (!d.epost?.trim() || !d.epost.includes('@')) throw new Error('Gyldig e-post er påkrevd')
    if (!d.melding?.trim()) throw new Error('Melding er påkrevd')
    return {
      navn: d.navn.trim(),
      epost: d.epost.trim(),
      telefon: d.telefon?.trim() || undefined,
      melding: d.melding.trim(),
    }
  })
  .handler(async ({ data }): Promise<KontaktResult> => {
    const apiKey = process.env['BREVO_API_KEY']
    const toEmail = process.env['CONTACT_TO_EMAIL'] ?? 'hei@filosamtale.no'
    const senderEmail = process.env['SENDER_EMAIL'] ?? 'noreply@filosamtale.no'

    if (!apiKey) {
      console.error('[kontakt] BREVO_API_KEY er ikke satt')
      return { ok: false, feilmelding: 'Konfigurasjonsfeil — prøv igjen senere.' }
    }

    console.log('[kontakt] Sender e-post fra', senderEmail, 'til', toEmail)

    const html = `
      <h2>Ny henvendelse fra filosamtale.no</h2>
      <p><strong>Navn:</strong> ${escHtml(data.navn)}</p>
      <p><strong>E-post:</strong> ${escHtml(data.epost)}</p>
      ${data.telefon ? `<p><strong>Telefon:</strong> ${escHtml(data.telefon)}</p>` : ''}
      <p><strong>Melding:</strong></p>
      <blockquote style="border-left:3px solid #4fb8b2;padding-left:12px;color:#416166">
        ${escHtml(data.melding).replace(/\n/g, '<br>')}
      </blockquote>
    `

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Filosamtale Kontaktskjema', email: senderEmail },
        to: [{ email: toEmail, name: 'Filosamtale' }],
        replyTo: { email: data.epost, name: data.navn },
        subject: `Ny henvendelse fra ${data.navn}`,
        htmlContent: html,
      }),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error('[kontakt] Brevo API feil', res.status, body)
      
      // Parse error details if available
      let errorMsg = 'Kunne ikke sende meldingen. Prøv igjen.'
      try {
        const errorData = JSON.parse(body)
        if (errorData.message) {
          errorMsg = `Brevo feil: ${errorData.message}`
        }
      } catch {
        // Not JSON or parsing failed
      }
      
      return { 
        ok: false, 
        feilmelding: `${errorMsg} (Status: ${res.status})` 
      }
    }

    return { ok: true }
  })

function escHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
