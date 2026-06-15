/**
 * Utilities for generating JSON-LD structured data for SEO
 * @see https://schema.org/
 */

type StructuredData = Record<string, any>

export function generateWebsiteSchema(baseUrl: string): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Filosamtale',
    url: baseUrl,
    description: 'Filosofisk veiledning, samtalegrupper og seminarer i Fevik, Agder',
    inLanguage: 'nb-NO',
    publisher: {
      '@type': 'Person',
      name: 'Tina Maria Lie',
    },
  }
}

export function generateLocalBusinessSchema(baseUrl: string): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Filosamtale',
    description: 'Filosofisk veiledning og dialog',
    founder: {
      '@type': 'Person',
      name: 'Tina Maria Lie',
      jobTitle: 'Filosof og Sykepleier',
      knowsAbout: ['Filosofi', 'Sykepleie', 'Eksistensiell veiledning', 'Filosofisk praksis'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Fevik',
      addressRegion: 'Agder',
      addressCountry: 'NO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'NO',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Norge',
    },
    url: baseUrl,
    priceRange: '$$',
    availableLanguage: ['nb', 'no'],
  }
}

export function generateBlogPostSchema(params: {
  title: string
  excerpt: string
  body: string
  date: string
  author: string
  category: string
  url: string
  imageUrl?: string
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: params.title,
    description: params.excerpt,
    articleBody: params.body,
    datePublished: params.date,
    author: {
      '@type': 'Person',
      name: params.author,
    },
    publisher: {
      '@type': 'Person',
      name: 'Tina Maria Lie',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': params.url,
    },
    articleSection: params.category,
    inLanguage: 'nb-NO',
    ...(params.imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: params.imageUrl,
      },
    }),
  }
}

export function generateEventSchema(params: {
  name: string
  description: string
  startDate: string
  endDate?: string
  location: string
  eventType: string
  price?: number
  maxParticipants?: number
  url: string
}): StructuredData {
  const event: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: params.name,
    description: params.description,
    startDate: params.startDate,
    endDate: params.endDate || params.startDate,
    eventAttendanceMode: params.location.toLowerCase().includes('nett') 
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: params.location.toLowerCase().includes('nett')
      ? {
          '@type': 'VirtualLocation',
          url: params.url,
        }
      : {
          '@type': 'Place',
          name: params.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Fevik',
            addressRegion: 'Agder',
            addressCountry: 'NO',
          },
        },
    organizer: {
      '@type': 'Person',
      name: 'Tina Maria Lie',
    },
  }

  if (params.price !== undefined) {
    event.offers = {
      '@type': 'Offer',
      price: params.price,
      priceCurrency: 'NOK',
      availability: 'https://schema.org/InStock',
      url: params.url,
    }
  }

  if (params.maxParticipants) {
    event.maximumAttendeeCapacity = params.maxParticipants
  }

  return event
}

export function generateServiceSchema(params: {
  name: string
  description: string
  serviceType: string
  price?: string
  duration?: string
  url: string
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    serviceType: params.serviceType,
    provider: {
      '@type': 'Person',
      name: 'Tina Maria Lie',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Norge',
    },
    ...(params.price && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'NOK',
        price: params.price,
      },
    }),
    url: params.url,
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
