import { Link } from "@tanstack/react-router";
import ContactForm from "./ContactForm";
import NewsletterDialog from "./NewsletterDialog";
import IslandKicker from "./ui/IslandKicker";
import { FaFacebook } from "react-icons/fa"; // From Font Awesome
import { FaInstagram } from "react-icons/fa"; // From Font Awesome
import { FaWhatsapp } from "react-icons/fa"; // From Font Awesome
import PageWrap from "./ui/PageWrap";
import IslandShell from "./ui/IslandShell";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="kontakt"
      className="border-t border-line bg-card pb-20 md:pb-10 pt-14"
    >
      <PageWrap>
        {/* Contact section */}
        <ContactForm />

        {/* Newsletter strip */}
        <IslandShell className="mt-10 p-6 sm:p-8 flex gap-5 items-center w-full">
          <Mail color="var(--palm)" size="40" className="hidden sm:block" />
          <div className="flex-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <IslandKicker className="mb-1">Nyhetsbrev</IslandKicker>
              <p className="text-sea-ink-soft text-balance">
                Få varsler om kommende arrangementer, nye blogginnlegg og
                tjenester.
              </p>
            </div>
            <NewsletterDialog trigger={<Button>Meld deg på</Button>} />
          </div>
        </IslandShell>

        {/* Bottom bar */}
        <div className="mt-10 border-t pt-8">
          <div className="grid md:grid-cols-2 w-full gap-4 max-md:place-items-center">
            {/* <div className="flex flex-col items-center md:items-start gap-2 md:order-first"> */}
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-semibold text-foreground">
                Filosamtale
              </span>
              <span className="text-sea-ink-soft">—</span>
              <span className="text-sm text-sea-ink-soft">Fevik, Agder</span>
            </div>

            <nav className="flex flex-wrap justify-center items-center gap-x-5 gap-y-1 text-sm text-sea-ink-soft md:justify-self-end">
              <Link to="/om-meg" className="hover:text-foreground">
                Om meg
              </Link>
              <Link to="/tjenester" className="hover:text-foreground">
                Tjenester
              </Link>
              <Link to="/blogg" className="hover:text-foreground">
                Blogg
              </Link>
              <Link to="/arrangementer" className="hover:text-foreground">
                Arrangementer
              </Link>
            </nav>
            <div className="flex items-center gap-4 text-sm text-sea-ink-soft md:justify-self-end">
              <a
                href="https://facebook.com/filosamtale"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://instagram.com/filosamtale"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a aria-label="Chat on WhatsApp" href="https://wa.me/4797158251">
                <FaWhatsapp size={20} />
              </a>
            </div>
            <p className="text-xs text-sea-ink-soft md:row-start-2">
              &copy; {year}{" "}
              <a
                href="https://spillingweb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                Spilling Web
              </a>
              . Alle rettigheter forbeholdt.
            </p>
          </div>
        </div>
      </PageWrap>
    </footer>
  );
}
