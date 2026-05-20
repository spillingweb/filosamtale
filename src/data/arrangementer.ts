export interface Arrangement {
  slug: string
  title: string
  description: string
  date: string
  endDate?: string
  time: string
  location: string
  price: number
  capacity: number
  category: 'seminar' | 'gruppe' | 'kurs' | 'dialog'
  isOnline: boolean
  registrationUrl?: string
}

export const kommende: Arrangement[] = [
  {
    slug: 'filosofisk-kafe-juni',
    title: 'Filosofisk kafé: Hva er et godt liv?',
    description:
      'En åpen og uformell samtale om hva det vil si å leve godt. Vi utforsker spørsmålet fra ulike filosofiske perspektiver — fra Aristoteles til moderne positiv psykologi. Ingen forkunnskaper nødvendig. Ta med nysgjerrighet og gjerne en venn.',
    date: '2025-06-12',
    time: '18:00–20:00',
    location: 'Fevik Kafé, Strandveien 14, Fevik',
    price: 0,
    capacity: 20,
    category: 'gruppe',
    isOnline: false,
  },
  {
    slug: 'samtalegruppe-eksistensielle-sporsmal',
    title: 'Samtalegruppe: Eksistensielle spørsmål',
    description:
      'Månedlig gruppe for deg som ønsker å utforske livets store spørsmål i trygt selskap. Vi snakker om mening, identitet, relasjoner og det å være menneske. Gruppa møtes fast den første mandagen i måneden.',
    date: '2025-06-02',
    time: '17:30–19:30',
    location: 'Sykosofi Samtalerom, Grimstadveien 8, Fevik',
    price: 450,
    capacity: 8,
    category: 'gruppe',
    isOnline: false,
  },
  {
    slug: 'dagsseminar-filosofi-og-helse',
    title: 'Dagsseminar: Filosofi og helse',
    description:
      'Et halvdagsseminar for helsepersonell og interesserte om eksistensielle dimensjoner i omsorgsfaget. Vi ser på hvordan filosofisk tenkning kan berike møtet med pasienter og pårørende. Seminarrekke på tre deler.',
    date: '2025-09-13',
    time: '09:00–13:00',
    location: 'Aust-Agder Kulturhus, Grimstad',
    price: 1200,
    capacity: 25,
    category: 'seminar',
    isOnline: false,
  },
  {
    slug: 'online-kurs-stoisk-filosofi',
    title: 'Nettkurs: Stoisk filosofi i praksis',
    description:
      'Fire ukentlige nettmøter der vi dykker inn i stoisk filosofi og omsetter den til praktiske verktøy for hverdagen. Passer for deg som ønsker mer ro, klarhet og motstandskraft. Alt materiale sendes på e-post.',
    date: '2025-08-04',
    endDate: '2025-08-25',
    time: '19:00–20:30',
    location: 'Nettmøte (Zoom)',
    price: 800,
    capacity: 15,
    category: 'kurs',
    isOnline: true,
  },
]

export const tidligere: Arrangement[] = [
  {
    slug: 'filosofisk-kafe-april',
    title: 'Filosofisk kafé: Hva er rettferdighet?',
    description: 'En kveld med åpen samtale om rettferdighetens natur og vår tids store etiske dilemmaer.',
    date: '2025-04-10',
    time: '18:00–20:00',
    location: 'Fevik Kafé, Strandveien 14, Fevik',
    price: 0,
    capacity: 20,
    category: 'gruppe',
    isOnline: false,
  },
  {
    slug: 'introduksjon-til-fenomenologi',
    title: 'Introduksjon til fenomenologi',
    description: 'Et introduksjonsseminar om fenomenologisk filosofi og dens relevans for hverdagslivet.',
    date: '2025-03-01',
    time: '10:00–15:00',
    location: 'Sykosofi Samtalerom, Grimstadveien 8, Fevik',
    price: 950,
    capacity: 12,
    category: 'seminar',
    isOnline: false,
  },
]
