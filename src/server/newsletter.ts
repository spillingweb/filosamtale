import { createServerFn } from "@tanstack/react-start";

interface NewsLetterPayload {
  name?: string;
  email: string;
  consentAccepted?: boolean;
}

interface NewsLetterResult {
  ok: boolean;
  feilmelding?: string;
}

export const subscribeToNewsLetter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown): NewsLetterPayload => {
    const d = data as NewsLetterPayload;

    if (!d.email?.trim() || !d.email.includes("@")) {
      throw new Error("En gyldig e-postadresse er påkrevd");
    }

    return {
      name: d.name?.trim() || "",
      email: d.email.trim().toLowerCase(),
      consentAccepted: d.consentAccepted ?? false,
    };
  })
  .handler(async ({ data }): Promise<NewsLetterResult> => {
    const apiKey = process.env["BREVO_API_KEY"] ?? undefined;

    if (!apiKey) {
      console.error("[newsletter] Ingen Brevo API-nøkkel funnet");
      return { ok: false, feilmelding: "Konfigurasjonsfeil på serveren." };
    }

    const NYHETSBREV_LIST_ID = 2;

    try {
      const res = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          attributes: {
            FIRSTNAME: data.name || "",
          },
          listIds: [NYHETSBREV_LIST_ID],
          updateEnabled: true, // Updates the contact if it already exists in the Brevo system
        }),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        console.error("[newsletter] Brevo API feil:", res.status, body);
        return {
          ok: false,
          feilmelding: "Kunne ikke melde på. Prøv igjen senere.",
        };
      }

      console.log(
        `[newsletter] Suksess! ${data.email} er lagt til i liste ${NYHETSBREV_LIST_ID}`,
      );
      return { ok: true };
    } catch (error) {
      console.error("[newsletter] Nettverksfeil mot Brevo:", error);
      return { ok: false, feilmelding: "Klarte ikke å koble til serveren." };
    }
  });
