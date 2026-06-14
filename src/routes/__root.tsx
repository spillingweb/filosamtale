import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { client } from '../../tina/__generated__/client'

import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  loader: async () => {
    const kontaktResult = await client.queries.pages({ relativePath: 'kontakt-info.md' })
    return { kontakt: kontaktResult }
  },
  component: RootComponent,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Filosamtale — Filosofisk veiledning og dialog i Fevik' },
      {
        name: 'description',
        content:
          'Filosamtale tilbyr filosofisk veiledning, samtalegrupper og seminarer i Fevik, Agder. Sykepleier og filosof Tina Maria Lie hjelper deg å utforske livets store spørsmål.',
      },
      { name: 'keywords', content: 'filosofisk veiledning, samtalegruppe, seminar, Fevik, Agder, filosofi, sykepleier, eksistensiell samtale' },
      { property: 'og:title', content: 'Filosamtale — Filosofisk veiledning og dialog' },
      {
        property: 'og:description',
        content: 'Filosofisk veiledning, seminarer og samtalegrupper i Fevik og på nett. Utforsk livets spørsmål med en sykepleier og filosof.',
      },
      { property: 'og:locale', content: 'nb_NO' },
      { property: 'og:type', content: 'website' },
      { name: 'geo.region', content: 'NO-42' },
      { name: 'geo.placename', content: 'Fevik, Agder' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' as const },
    ],
  }),
  shellComponent: RootDocument,
})

function RootComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]">
        {children}
        <Scripts />
      </body>
    </html>
  )
}

