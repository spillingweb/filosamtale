import {
  HeadContent,
  Scripts,
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Footer from "../features/footer/Footer";
import { client } from "../../tina/__generated__/client";
import {
  generateWebsiteSchema,
  generateLocalBusinessSchema,
} from "../lib/structured-data";

import appCss from "../styles.css?url";
import NotFound from "#/components/NotFound";
import Header from "#/features/header/Header";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRoute({
  loader: async () => {
    const kontaktResult = await client.queries.pages({
      relativePath: "kontakt-info.md",
    });
    return { kontakt: kontaktResult };
  },
  component: RootComponent,
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const baseUrl = "https://filosamtale.no";
  return (
    <html lang="nb" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              generateWebsiteSchema(baseUrl),
              generateLocalBusinessSchema(baseUrl),
            ]),
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
