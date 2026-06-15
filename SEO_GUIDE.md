# SEO Implementation Guide for Filosamtale

## ✅ Completed

- [x] Root route with base meta tags
- [x] Structured data utilities created
- [x] LocalBusiness & Website schema added
- [x] Blog post route with full SEO (meta tags + structured data)
- [x] Dynamic sitemap.xml generator
- [x] Updated robots.txt with sitemap reference
- [x] Canonical URLs in root and blog routes
- [x] Twitter/X Card meta tags

## 📋 Next Steps

### 1. Add Head Options to Remaining Routes

Add the `head` option to these routes:

#### **[src/routes/index.tsx](src/routes/index.tsx)** (Homepage)
```typescript
head: () => ({
  meta: [
    { title: 'Filosamtale — Filosofisk veiledning og dialog i Fevik' },
    { name: 'description', content: 'Filosamtale tilbyr filosofisk veiledning, samtalegrupper og seminarer i Fevik, Agder. Utforsk livets store spørsmål med sykepleier og filosof Tina Maria Lie.' },
    { property: 'og:title', content: 'Filosamtale' },
    { property: 'og:type', content: 'website' },
  ],
  links: [
    { rel: 'canonical', href: 'https://filosamtale.no' }
  ],
}),
```

#### **[src/routes/tjenester/index.tsx](src/routes/tjenester/index.tsx)**
```typescript
import { generateServiceSchema } from '#/lib/structured-data'

head: ({ loaderData }) => {
  const baseUrl = 'https://filosamtale.no'
  const services = loaderData.tjenester.data.tjenesterConnection.edges || []
  
  return {
    meta: [
      { title: 'Tjenester — Filosofisk veiledning og samtalegrupper — Filosamtale' },
      { name: 'description', content: 'Filosamtale tilbyr filosofisk veiledning, samtalegrupper, seminarer og nettkurs. Utforsk eksistensielle spørsmål med en erfaren sykepleier og filosof.' },
      { property: 'og:title', content: 'Tjenester — Filosamtale' },
      { property: 'og:type', content: 'website' },
    ],
    links: [
      { rel: 'canonical', href: `${baseUrl}/tjenester` }
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(
          services.map(edge => {
            const service = edge?.node
            if (!service) return null
            return generateServiceSchema({
              name: service.name,
              description: service.description,
              serviceType: service.category,
              url: `${baseUrl}/tjenester#${service._sys.filename}`,
            })
          }).filter(Boolean)
        ),
      },
    ],
  }
},
```

#### **[src/routes/arrangementer/index.tsx](src/routes/arrangementer/index.tsx)**
```typescript
import { generateEventSchema } from '#/lib/structured-data'

head: ({ loaderData }) => {
  const baseUrl = 'https://filosamtale.no'
  const events = loaderData.arrangementer.data.arrangementerConnection.edges || []
  
  return {
    meta: [
      { title: 'Arrangementer — Seminarer, kurs og samtalegrupper — Filosamtale' },
      { name: 'description', content: 'Kommende arrangementer hos Filosamtale. Bli med på filosofiske samtaler, seminarer og workshops i Fevik og på nett.' },
      { property: 'og:title', content: 'Arrangementer — Filosamtale' },
      { property: 'og:type', content: 'website' },
    ],
    links: [
      { rel: 'canonical', href: `${baseUrl}/arrangementer` }
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(
          events.map(edge => {
            const event = edge?.node
            if (!event) return null
            return generateEventSchema({
              name: event.title,
              description: event.description,
              startDate: event.date,
              location: event.location,
              eventType: event.category,
              price: event.price,
              maxParticipants: event.maxParticipants,
              url: `${baseUrl}/arrangementer#${event._sys.filename}`,
            })
          }).filter(Boolean)
        ),
      },
    ],
  }
},
```

#### **[src/routes/om-meg/index.tsx](src/routes/om-meg/index.tsx)**
```typescript
head: () => ({
  meta: [
    { title: 'Om meg — Tina Maria Lie — Filosamtale' },
    { name: 'description', content: 'Tina Maria Lie er sykepleier og filosof. Les om bakgrunnen min og hvorfor jeg tilbyr filosofisk veiledning og dialog.' },
    { property: 'og:title', content: 'Om meg — Filosamtale' },
    { property: 'og:type', content: 'profile' },
  ],
  links: [
    { rel: 'canonical', href: 'https://filosamtale.no/om-meg' }
  ],
}),
```

#### **[src/routes/kontakt.tsx](src/routes/kontakt.tsx)**
```typescript
head: () => ({
  meta: [
    { title: 'Kontakt — Ta kontakt med Filosamtale' },
    { name: 'description', content: 'Ta kontakt med Filosamtale for filosofisk veiledning, samtalegrupper eller seminarer. Jeg svarer gjerne på spørsmål om mine tjenester.' },
    { property: 'og:title', content: 'Kontakt — Filosamtale' },
    { property: 'og:type', content: 'website' },
  ],
  links: [
    { rel: 'canonical', href: 'https://filosamtale.no/kontakt' }
  ],
}),
```

### 2. Add Open Graph Images

Create og-images for better social sharing:

1. **Create images:**
   - Main OG image: 1200x630px (recommended)
   - Save in `public/og-image.jpg`
   - Create page-specific images if possible

2. **Add to meta tags:**
```typescript
{ property: 'og:image', content: 'https://filosamtale.no/og-image.jpg' },
{ property: 'og:image:width', content: '1200' },
{ property: 'og:image:height', content: '630' },
{ property: 'og:image:alt', content: 'Filosamtale — Filosofisk veiledning og dialog' },
{ name: 'twitter:image', content: 'https://filosamtale.no/og-image.jpg' },
```

### 3. Optimize Images

- Add descriptive `alt` attributes to all images
- Use WebP format where possible
- Implement lazy loading: `loading="lazy"`
- Consider responsive images with `srcset`

### 4. Performance Optimization

These impact SEO rankings:

```typescript
// In vite.config.ts, consider adding:
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        router: ['@tanstack/react-router'],
      },
    },
  },
},
```

### 5. Content Optimization

- **Headings hierarchy:** Ensure proper H1, H2, H3 structure
- **Internal linking:** Link between related blog posts and services
- **Keywords:** Use Norwegian keywords naturally in content
- **Reading time:** Already implemented ✅
- **Meta descriptions:** Keep under 160 characters
- **Title tags:** Keep under 60 characters, include keywords

### 6. Technical SEO

- [ ] Set up Google Search Console
- [ ] Submit sitemap: `https://filosamtale.no/sitemap.xml`
- [ ] Set up Google Analytics or privacy-friendly alternative
- [ ] Implement breadcrumbs UI (schema already added for blog)
- [ ] Add hreflang tags if you add multiple languages
- [ ] Test with Google Rich Results Test
- [ ] Monitor Core Web Vitals

### 7. Local SEO (Important for Fevik location)

- [ ] Create Google Business Profile
- [ ] Ensure NAP (Name, Address, Phone) consistency
- [ ] Add location pages if serving multiple areas
- [ ] Get listed in Norwegian directories
- [ ] Encourage client reviews (if applicable)

### 8. Content Strategy

- **Blog regularly:** 1-2 posts per month minimum
- **Target long-tail keywords:** e.g., "filosofisk veiledning Agder", "eksistensiell samtalegruppe"
- **Answer questions:** Create content around FAQs
- **Local content:** Write about philosophy events in Fevik/Agder

### 9. Testing & Monitoring

Test your SEO with these tools:

- **Google Search Console:** Monitor indexing and performance
- **Lighthouse:** Test performance and SEO score
- **Schema Validator:** https://validator.schema.org/
- **Rich Results Test:** https://search.google.com/test/rich-results
- **Meta Tags Checker:** https://metatags.io/

Run Lighthouse:
```bash
npm install -g lighthouse
lighthouse https://filosamtale.no --view
```

### 10. Update Domain References

Replace all instances of `https://filosamtale.no` with your actual domain:
- [src/routes/__root.tsx](src/routes/__root.tsx)
- [src/routes/blogg/$slug.tsx](src/routes/blogg/$slug.tsx)
- [src/routes/sitemap.xml.tsx](src/routes/sitemap.xml.tsx)
- All other routes with head options

## 🔍 Quick Wins

1. **Social media meta tags are now complete** ✅
2. **Structured data will show rich snippets** in Google ✅
3. **Sitemap helps search engines discover content** ✅
4. **Each page now has unique titles/descriptions**
5. **Canonical URLs prevent duplicate content issues** ✅

## 📊 Expected Results

After implementing these changes and waiting 2-4 weeks:

- Better click-through rates from search results
- Rich snippets in Google (star ratings, breadcrumbs, event info)
- Improved local search visibility for Fevik/Agder
- Better social media previews when sharing links
- Increased organic traffic from long-tail keywords

## 🚀 Priority Order

1. **High Priority** (Do now):
   - Add head options to all routes
   - Add OG images
   - Update domain references
   - Submit sitemap to Google Search Console

2. **Medium Priority** (Next week):
   - Optimize existing images
   - Add internal linking
   - Set up analytics
   - Create Google Business Profile

3. **Ongoing**:
   - Publish regular blog content
   - Monitor Search Console
   - Update structured data as needed
   - Improve Core Web Vitals

---

**Need help?** Check TanStack Router docs on SSR and head management:
- https://tanstack.com/router/latest/docs/framework/react/guide/ssr
- https://tanstack.com/router/latest/docs/framework/react/api/router/createRouteFunction#head
