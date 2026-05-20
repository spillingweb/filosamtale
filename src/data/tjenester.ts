import filosofiskDialog from '../../content/tjenester/filosofisk-dialog.json'
import nettkurs from '../../content/tjenester/nettkurs.json'
import samtalegrupper from '../../content/tjenester/samtalegrupper.json'
import seminarerOgWorkshops from '../../content/tjenester/seminarer-og-workshops.json'
import veiledningForHelsepersonell from '../../content/tjenester/veiledning-for-helsepersonell.json'

export interface TjenestePris {
  tittel: string
  undertittel: string
  beskrivelse: string
  detaljer: string[]
  priser: { label: string; pris: string }[]
  badge?: string
  orden: number
}

export interface TjenesteWithId extends TjenestePris {
  id: string
}

// Import and map all tjenester with their IDs
export const tjenester: TjenesteWithId[] = [
  { ...filosofiskDialog, id: 'filosofisk-dialog' },
  { ...nettkurs, id: 'nettkurs' },
  { ...samtalegrupper, id: 'samtalegrupper' },
  { ...seminarerOgWorkshops, id: 'seminarer-og-workshops' },
  { ...veiledningForHelsepersonell, id: 'veiledning-for-helsepersonell' },
].sort((a, b) => a.orden - b.orden)
