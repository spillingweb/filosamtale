import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeToNewsLetter } from "#/server/newsletter";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Check } from "lucide-react";

interface NewsletterDialogProps {
  trigger?: React.ReactNode;
}

const NewsletterDialog = ({ trigger }: NewsletterDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "feil">(
    "idle",
  );
  const [feilmelding, setFeilmelding] = useState("");

  const send = useServerFn(subscribeToNewsLetter);

  function resetForm() {
    setName("");
    setEmail("");
    setConsentAccepted(false);
    setStatus("idle");
    setFeilmelding("");
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) resetForm();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setFeilmelding("");
    try {
      const result = await send({ data: { name, email, consentAccepted } });
      if (result.ok) {
        setStatus("ok");
        setName("");
        setEmail("");
        setConsentAccepted(false);
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Meld deg på nyhetsbrevet</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {status === "ok" ? (
          <>
            <DialogHeader className="items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                <Check color="var(--palm)" />
              </div>
              <DialogTitle>Du er meldt på!</DialogTitle>
              <DialogDescription className="text-center text-balance">
                Takk – du er nå meldt på nyhetsbrevet.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button className="w-full" onClick={() => setOpen(false)}>
                Lukk
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Meld deg på nyhetsbrevet</DialogTitle>
              <DialogDescription>
                Få tilsendt oppdateringer om hva som rører seg hos Filosamtale - nye blogginnlegg, arrangementer og tjenester.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field>
                <FieldLabel>Navn</FieldLabel>
                <Input
                  placeholder="Ditt fulle navn (valgfritt)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === "sending"}
                />
              </Field>
              <Field>
                <FieldLabel>E-post *</FieldLabel>
                <Input
                  type="email"
                  required
                  placeholder="din@epost.no"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "sending"}
                />
              </Field>
              <Field orientation="horizontal" className="items-start gap-2">
                <Checkbox
                  id="nl-consent"
                  checked={consentAccepted}
                  onCheckedChange={(checked) =>
                    setConsentAccepted(checked === true)
                  }
                  disabled={status === "sending"}
                  required
                />
                <FieldLabel
                  htmlFor="nl-consent"
                  className="text-muted-foreground text-balance text-xs"
                >
                  Jeg godtar at Filosamtale lagrer min e-postadresse for å
                  sende meg nyhetsbrev. Du kan melde deg av når som helst.
                </FieldLabel>
              </Field>

              {status === "feil" && (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {feilmelding}
                </p>
              )}

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Melder på..." : "Meld meg på"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterDialog;
