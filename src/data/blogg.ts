export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  body: string
  date: string
  category: string
  readingTime: number
}

export const bloggPosts: BlogPost[] = [
  {
    slug: 'hva-er-filosofisk-dialog',
    title: 'Hva er filosofisk dialog?',
    excerpt:
      'Filosofisk dialog er ikke terapi, og det er ikke undervisning. Det er noe midt imellom — en undersøkende samtale der vi sammen utforsker spørsmål som ikke har enkle svar.',
    date: '2025-04-15',
    category: 'Filosofi',
    readingTime: 5,
    body: `Filosofisk dialog er ikke terapi, og det er ikke undervisning. Det er noe midt imellom — en undersøkende samtale der vi sammen utforsker spørsmål som ikke har enkle svar.

Sokrates mente at visdom begynner med å innrømme hva man ikke vet. «Jeg vet at jeg intet vet» er ikke defaitisme — det er åpningen for ekte nysgjerrighet. Når vi slipper kravet om å ha rett svar, kan vi begynne å tenke ordentlig.

I min praksis bruker jeg filosofisk dialog som en metode for å hjelpe mennesker med å undersøke sine egne verdier, forestillinger og antakelser. Det handler ikke om å gi deg svar — det handler om å hjelpe deg til å stille bedre spørsmål.

**Hva skjer i en filosofisk dialog?**

Vi begynner gjerne med et spørsmål du bringer med deg. Det kan være eksistensielt («Hva gir livet mening?»), etisk («Har jeg gjort rett?»), eller praktisk («Hvordan vil jeg leve?»). Gjennom samtalen undersøker vi spørsmålet fra ulike vinkler, utfordrer premissene, og lar tanken arbeide fritt.

Resultatet er sjelden et klart svar — men ofte en dypere forståelse av deg selv og det du egentlig lurer på.`,
  },
  {
    slug: 'omsorg-og-mening-fra-sykepleie',
    title: 'Omsorg og mening — erfaringer fra sykepleie',
    excerpt:
      'Etter ti år som sykepleier vet jeg at de dypeste menneskelige spørsmålene ikke stilles på legekontoret, men ved sengen til den som ligger der.',
    date: '2025-03-22',
    category: 'Refleksjon',
    readingTime: 7,
    body: `Etter ti år som sykepleier vet jeg at de dypeste menneskelige spørsmålene ikke stilles på legekontoret, men ved sengen til den som ligger der.

Det var en pasient jeg aldri glemmer. Han var 78 år og hadde fått vite at behandlingen ikke lenger virket. «Har livet mitt hatt noen mening?» spurte han meg en kveld. Jeg hadde ikke svar — men jeg visste at spørsmålet fortjente å bli tatt på alvor.

Det var da jeg bestemte meg for å studere filosofi.

**Sykepleie som eksistensiell praksis**

Helsevesenet er flinkt til å behandle kropper. Vi er langt dårligere på å møte mennesker i deres eksistensielle uro. Angsten for døden, spørsmålet om livets verdi, savnet etter det livet man hadde tenkt å leve — dette er ikke psykiatriske symptomer. Det er grunnleggende menneskelige erfaringer.

Filosofisk omsorg handler om å skape rom for disse spørsmålene. Ikke å løse dem — for de lar seg ikke løse. Men å sitte med dem, utforske dem, og hjelpe mennesker til å leve bedre med den usikkerheten livet innebærer.`,
  },
  {
    slug: 'stoikernes-visdom-i-moderne-liv',
    title: 'Stoikernes visdom i et moderne liv',
    excerpt:
      'Marcus Aurelius styrte et rike og kjempet i krig — likevel fant han tid til å skrive dagboknotater om sinnsro. Hva kan han lære oss om å leve i en travel hverdag?',
    date: '2025-02-10',
    category: 'Filosofihistorie',
    readingTime: 6,
    body: `Marcus Aurelius styrte et rike og kjempet i krig — likevel fant han tid til å skrive dagboknotater om sinnsro. Hva kan han lære oss om å leve i en travel hverdag?

Stoikerne mente at lykke ikke avhenger av ytre omstendigheter, men av hvordan vi forholder oss til dem. «Du har makt over sinnet ditt, ikke over ytre hendelser,» skriver Aurelius. «Erkjenn dette, og du finner styrke.»

**Det du ikke kan kontrollere**

Mye av vår hverdagsangst kommer av at vi bruker energi på ting vi ikke kan påvirke — andres meninger om oss, fremtidens usikkerhet, fortidas feil. Stoikerne tilbyr en enkel øvelse: skill mellom det som er i din makt og det som ikke er det.

Det i din makt er dine valg, dine tanker, dine reaksjoner. Alt annet er utenfor din kontroll.

Denne erkjennelsen er ikke en invitasjon til passivitet — tvert imot. Når du slutter å bekymre deg for det du ikke kan endre, frigjøres energi til å handle på det du faktisk kan påvirke.

I mine seminarer bruker vi stoisk filosofi som praktisk verktøy for å møte hverdagens utfordringer med større ro og klarhet.`,
  },
  {
    slug: 'grenser-i-relasjoner',
    title: 'Å sette grenser — en filosofisk betraktning',
    excerpt:
      'Å si nei er ikke egoisme. Det er integritet. Men hva er egentlig en grense, og hvorfor er det så vanskelig å håndheve dem?',
    date: '2025-01-08',
    category: 'Etikk',
    readingTime: 5,
    body: `Å si nei er ikke egoisme. Det er integritet. Men hva er egentlig en grense, og hvorfor er det så vanskelig å håndheve dem?

Vi vokser opp med forestillingen om at å hjelpe andre er en dyd — og det er det. Men det er en dyd som forutsetter at du har noe å gi. En tom kanne kan ikke helle.

**Grenser som selvrespekt**

Filosofen Kant argumenterte for at vi har en plikt til å behandle oss selv som mål i oss selv, ikke bare som midler. Det betyr at du ikke bare har rett til å ta vare på deg selv — du har en slags plikt til det.

Å sette grenser er ikke å si «jeg er viktigere enn deg». Det er å si «vi er begge viktige, og for at jeg skal kunne bidra i dette forholdet, trenger jeg å passe på meg selv».

I filosofisk dialog jobber vi ofte med spørsmålet om hva som egentlig er dine verdier — og om handlingene dine stemmer overens med dem. Mange opplever at vanskeligheten med å sette grenser bunner i uavklarte verdier snarere enn mangel på vilje.`,
  },
]
