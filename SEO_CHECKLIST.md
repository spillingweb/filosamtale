# SEO Quick Reference — Filosamtale

## 🎯 Quick Testing Checklist

After deploying, test these:

### 1. Meta Tags
```bash
curl -I https://filosamtale.no
# Should return 200 OK
```

View source on each page and verify:
- [ ] Unique `<title>` tag (under 60 chars)
- [ ] Meta description (under 160 chars)
- [ ] Canonical URL
- [ ] Open Graph tags (og:title, og:description, og:url, og:type)
- [ ] Twitter Card tags

### 2. Structured Data

Test with **Google Rich Results Test**:
https://search.google.com/test/rich-results

Enter your URLs:
- [ ] Homepage → LocalBusiness + Website schema
- [ ] Blog post → BlogPosting + Breadcrumb schema
- [ ] Services page → Service schema
- [ ] Events page → Event schema

### 3. Sitemap

Visit: https://filosamtale.no/sitemap.xml
- [ ] Should return XML (not 404)
- [ ] Contains all important pages
- [ ] Blog posts included
- [ ] Dates are recent

### 4. robots.txt

Visit: https://filosamtale.no/robots.txt
- [ ] References sitemap
- [ ] Blocks /admin/ and /tina/
- [ ] Allows everything else

### 5. Performance (Lighthouse)

```bash
# Install Lighthouse globally
npm install -g lighthouse

# Run test
lighthouse https://filosamtale.no --view
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- **SEO: 95+** ⭐

### 6. Social Media Preview

Test how links appear when shared:
- **Facebook/LinkedIn**: https://developers.facebook.com/tools/debug/
- **Twitter/X**: https://cards-dev.twitter.com/validator

Should show:
- [ ] Correct title
- [ ] Correct description
- [ ] Image (once you add og:image)

### 7. Google Search Console

After deploying:

1. **Add property**: https://search.google.com/search-console
2. **Verify ownership** (DNS or HTML file method)
3. **Submit sitemap**: `https://filosamtale.no/sitemap.xml`
4. **Request indexing** for key pages
5. **Monitor** after 2-4 weeks

### 8. Mobile-Friendly Test

https://search.google.com/test/mobile-friendly

- [ ] Page is mobile-friendly
- [ ] Text is readable without zooming
- [ ] Tap targets are appropriately sized

## 📝 Key Files Modified

- ✅ [src/lib/structured-data.ts](src/lib/structured-data.ts) — Schema utilities
- ✅ [src/routes/__root.tsx](src/routes/__root.tsx) — Base meta + structured data
- ✅ [src/routes/blogg/$slug.tsx](src/routes/blogg/$slug.tsx) — Blog SEO + schema
- ✅ [src/routes/sitemap.xml.tsx](src/routes/sitemap.xml.tsx) — Dynamic sitemap
- ✅ [public/robots.txt](public/robots.txt) — Search engine directives
- ✅ [public/manifest.json](public/manifest.json) — PWA manifest

## 🔄 Still To Do

### High Priority
1. **Update domain** in all files (search for `filosamtale.no`)
2. **Add head options** to remaining routes (see SEO_GUIDE.md)
3. **Create OG image** (1200x630px) and save to `public/og-image.jpg`
4. **Add alt text** to all images in content

### Medium Priority  
5. Set up Google Search Console
6. Add Google Analytics (or privacy-friendly alternative)
7. Create Google Business Profile
8. Optimize images (WebP format, compression)
9. Add internal links between blog posts

### Ongoing
10. Publish regular blog content (1-2x/month)
11. Monitor Search Console for errors
12. Update structured data as content changes
13. Build backlinks from quality sites

## 🎨 OG Image Creation

Create a 1200x630px image with:
- Your logo/branding
- Tagline: "Filosofisk veiledning og dialog"
- Location: "Fevik, Agder"
- Colors matching your theme (#4FB8B2)

Tools:
- Canva (easiest)
- Figma (more control)
- Adobe Express

Save as `public/og-image.jpg` and add to meta tags:
```typescript
{ property: 'og:image', content: 'https://filosamtale.no/og-image.jpg' },
{ property: 'og:image:width', content: '1200' },
{ property: 'og:image:height', content: '630' },
{ name: 'twitter:image', content: 'https://filosamtale.no/og-image.jpg' },
```

## 📊 Expected Timeline

| Week | Activity | Expected Result |
|------|----------|-----------------|
| 1 | Deploy changes, submit sitemap | Indexing begins |
| 2-4 | Google crawls site | Pages start appearing in search |
| 4-8 | Rich snippets appear | Improved CTR |
| 8-12 | Rankings stabilize | Organic traffic grows |
| 12+ | Ongoing optimization | Steady traffic increase |

## 🚨 Common Issues

### Sitemap 404
- Check file is at `src/routes/sitemap.xml.tsx`
- Route uses `.server` API correctly
- Deploy includes the route

### Structured Data Errors
- Use validator: https://validator.schema.org/
- Ensure all required fields present
- Check JSON syntax (no trailing commas)

### Meta Tags Not Showing
- Check head function returns correct format
- Verify HeadContent is in <head>
- Clear browser cache

### Poor SEO Score
- Check mobile responsiveness
- Optimize images (size, format, lazy loading)
- Improve page speed (check Core Web Vitals)
- Ensure proper heading hierarchy (H1 → H2 → H3)

## 📚 Resources

- **TanStack Router SSR**: https://tanstack.com/router/latest/docs/framework/react/guide/ssr
- **Schema.org**: https://schema.org/
- **Google Search Central**: https://developers.google.com/search
- **Web.dev**: https://web.dev/learn-seo/
- **Norwegian SEO**: Focus on `.no` domains and Norwegian directories

## 💡 Pro Tips

1. **Focus on Norwegian keywords** — Your audience is local
2. **Answer questions** — Create content around "hva er filosofisk veiledning?"
3. **Local citations** — Get listed in Norwegian business directories
4. **Content quality** — Better than frequency
5. **Internal linking** — Connect related blog posts
6. **User intent** — Write for humans, not just search engines
7. **E-E-A-T** — Show expertise (your education, experience)

---

**Need help?** See [SEO_GUIDE.md](SEO_GUIDE.md) for detailed implementation steps.
