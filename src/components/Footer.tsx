import { Link } from "@tanstack/react-router";
import ContactForm from "./ContactForm";
import { FaFacebook } from "react-icons/fa"; // From Font Awesome
import { FaInstagram } from "react-icons/fa"; // From Font Awesome
import { FaWhatsapp } from "react-icons/fa"; // From Font Awesome

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="kontakt" className="site-footer md:px-4 pb-10 pt-14">
      <div className="page-wrap">
        {/* Contact section */}
        <ContactForm />

        {/* Bottom bar */}
        <div className="mt-16 border-t pt-8">
          <div className="flex flex-col w-full items-center justify-between gap-4 text-center md:flex-row sm:text-left">
            <div className="flex flex-col gap-4 items-center md:items-end">
              <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-sea-ink-soft">
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
              <div className="flex items-center gap-4 text-sm text-sea-ink-soft">
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
                <a
                  aria-label="Chat on WhatsApp"
                  href="https://wa.me/4797158251"
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2 md:order-first">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-semibold text-foreground">
                  Filosamtale
                </span>
                <span className="text-sea-ink-soft">—</span>
                <span className="text-sm text-sea-ink-soft">Fevik, Agder</span>
              </div>
              <p className="text-xs text-sea-ink-soft">
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
        </div>
      </div>
    </footer>
  );
}
