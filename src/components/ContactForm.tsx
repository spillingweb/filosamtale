import { useState, useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getRouteApi, useSearch } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { DisplayHeading } from "./ui/DisplayHeading";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { sendKontaktskjema } from "#/server/kontakt";
import { useTina, tinaField } from "tinacms/dist/react";
import { Mail, MapPin, Phone } from "lucide-react";
import IslandKicker from "./ui/IslandKicker";
import IslandShell from "./ui/IslandShell";

const rootRoute = getRouteApi('__root__');

const ContactForm = () => {
  const send = useServerFn(sendKontaktskjema);
  const { kontakt: initialData } = rootRoute.useLoaderData();
  
  // Get pre-filled message from URL search params
  const searchParams = useSearch({ strict: false }) as { message?: string };

  const nameInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    navn: "",
    epost: "",
    telefon: "",
    melding: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "feil">(
    "idle",
  );
  const [feilmelding, setFeilmelding] = useState("");

  // Pre-fill message when URL param changes
  useEffect(() => {
    if (searchParams.message) {
      setForm(prev => ({ ...prev, melding: decodeURIComponent(searchParams.message as string) }));
      // Clear the message param from URL after pre-filling (keep hash)
      const url = new URL(window.location.href);
      url.searchParams.delete('message');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams.message]);

  // Focus first input when navigating to #kontakt
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#kontakt') {
        // Small delay to ensure scroll has completed
        setTimeout(() => {
          nameInputRef.current?.focus();
        }, 100);
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Also focus when message is pre-filled
  useEffect(() => {
    if (searchParams.message) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [searchParams.message]);

  // Enable live preview for contact info
  const { data } = useTina({
    query: initialData.query,
    variables: initialData.variables,
    data: initialData.data,
  });

  const page = data.pages;

  // Type guard: ensure we have kontakt template
  if (page.__typename !== "PagesKontakt") {
    throw new Error("Expected kontakt template for kontakt-info.md");
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setStatus("sending");
    setFeilmelding("");
    try {
      const result = await send({ data: form });
      if (result.ok) {
        setStatus("ok");
        setForm({ navn: "", epost: "", telefon: "", melding: "" });
      } else {
        setStatus("feil");
        setFeilmelding(result.feilmelding ?? "Noe gikk galt.");
      }
    } catch {
      setStatus("feil");
      setFeilmelding("Noe gikk galt. Vennligst prøv igjen.");
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* Left: info */}
      <div>
        <IslandKicker
          className="mb-3"
          data-tina-field={tinaField(page, "kicker")}
        >
          {page.kicker}
        </IslandKicker>
        <DisplayHeading
          as="h2"
          size="xl"
          className="mb-4"
          data-tina-field={tinaField(page, "heading")}
        >
          {page.heading}
        </DisplayHeading>
        <p
          className="mb-8 max-w-md text-sea-ink-soft leading-relaxed"
          data-tina-field={tinaField(page, "description")}
        >
          {page.description}
        </p>

        <div className="space-y-4 text-sm text-sea-ink-soft">
          <div className="flex items-start gap-3">
            <MapPin className="text-accent mt-0.5" size={16} />
            <div>
              <p className="font-medium text-foreground">Adresse</p>
              <p data-tina-field={tinaField(page, "addressLine1")}>
                {page.addressLine1}
              </p>
              <p data-tina-field={tinaField(page, "addressLine2")}>
                {page.addressLine2}
              </p>
              {page.addressLine3 && (
                <p data-tina-field={tinaField(page, "addressLine3")}>
                  {page.addressLine3}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="text-accent mt-0.5" size={16} />
            <div>
              <p className="font-medium text-foreground">E-post</p>
              <a
                href={`mailto:${page.email}`}
                className="hover:text-lagoon-deep"
                data-tina-field={tinaField(page, "email")}
              >
                {page.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-accent mt-0.5" size={16} />
            <div>
              <p className="font-medium text-foreground">Telefon</p>
              <a
                href={`tel:${page.phone}`}
                className="hover:text-lagoon-deep"
                data-tina-field={tinaField(page, "phone")}
              >
                {page.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right: contact form */}
      <IslandShell className="p-6 sm:p-8">
        {status === "ok" ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <svg viewBox="0 0 20 20" width="28" height="28" fill="none">
                <path
                  d="M4 10l5 5 7-8"
                  stroke="var(--palm)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Meldingen er sendt!
            </h3>
            <p className="text-sea-ink-soft">
              Takk for din henvendelse. Jeg svarer deg innen to virkedager.
            </p>
            <Button variant="outline" onClick={() => {
              setStatus("idle");
              setTimeout(() => nameInputRef.current?.focus(), 100);
            }}>
              Send ny melding
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 flex flex-col gap-1">
                <Label htmlFor="navn">Navn *</Label>
                <Input
                  ref={nameInputRef}
                  id="navn"
                  placeholder="Ditt fulle navn"
                  value={form.navn}
                  onChange={(e) => setForm({ ...form, navn: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5 flex flex-col gap-1">
                <Label htmlFor="epost">E-post *</Label>
                <Input
                  id="epost"
                  type="email"
                  placeholder="din@epost.no"
                  value={form.epost}
                  onChange={(e) => setForm({ ...form, epost: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5 flex flex-col gap-1">
              <Label htmlFor="telefon">Telefon</Label>
              <Input
                id="telefon"
                type="tel"
                placeholder="+47 000 00 000 (valgfritt)"
                value={form.telefon}
                onChange={(e) => setForm({ ...form, telefon: e.target.value })}
              />
            </div>
            <div className="space-y-1.5 flex flex-col gap-1">
              <Label htmlFor="melding">Melding *</Label>
              <Textarea
                id="melding"
                rows={5}
                placeholder="Fortell gjerne hva du lurer på, eller hva du ønsker hjelp til..."
                value={form.melding}
                onChange={(e) => setForm({ ...form, melding: e.target.value })}
                required
              />
            </div>

            {status === "feil" && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {feilmelding}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sender..." : "Send melding"}
            </Button>
            <p className="text-center text-xs text-sea-ink-soft">
              Informasjonen din behandles konfidensielt.
            </p>
          </form>
        )}
      </IslandShell>
    </div>
  );
};

export default ContactForm;
