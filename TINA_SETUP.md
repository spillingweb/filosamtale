# TinaCMS Guide

This site uses TinaCMS for visual content editing. All content is stored as markdown and JSON files in the `/content` folder and synced via Git.

## How It Works

**Content Structure:**
- **Blog posts** (`/content/blogg/*.md`) - Articles with title, excerpt, date, category, and rich-text body
- **Events** (`/content/arrangementer/*.md`) - Events with date, time, location, price, and capacity
- **Static pages** (`/content/pages/*.md`) - Homepage, about, services, contact with custom templates
- **Services** (`/content/tjenester/*.json`) - Service offerings with descriptions and pricing
- **Education** (`/content/utdanning/*.json`) - Degrees and certifications

**How TinaCMS Integrates:**
1. The configuration in `/tina/config.ts` defines all content schemas and field types
2. During build, `tinacms build` generates the admin UI in `/public/admin/`
3. The site routes `/admin` and `/admin/*` load the CMS interface via iframe
4. All edits are committed directly to the GitHub repository
5. Vercel automatically deploys when changes are pushed

## Setup for Production (Tina Cloud)

### 1. Create Tina Cloud Project
1. Go to [app.tina.io](https://app.tina.io) and sign up with GitHub
2. Create a new project and connect your GitHub repository
3. Copy your **Client ID** and generate a **Content Token**

### 2. Configure Environment Variables
Add these to your Vercel project settings:

```
TINA_PUBLIC_CLIENT_ID=<your-client-id>
TINA_TOKEN=<your-content-token>
GITHUB_BRANCH=main
```

**Note:** The `GITHUB_BRANCH` variable is optional - the config will auto-detect from Vercel's `VERCEL_GIT_COMMIT_REF` or default to `main`.

### 3. Deploy
Redeploy your site for the environment variables to take effect.

## Accessing the CMS

**For editors:** Visit `https://your-domain.com/admin` and log in with GitHub.

The admin interface provides:
- Visual editing for all content types
- Rich text editor with formatting tools
- Image uploads to `/public/uploads`
- Preview before committing
- Git history for all changes

## Content Collections

### Blogginnlegg (Blog Posts)
- Auto-generates URL-friendly slugs from titles
- Supports categories: Filosofi, Refleksjon, Filosofihistorie, Etikk, Helse, Annet
- Optional cover images and reading time
- Rich-text body with markdown support

### Arrangementer (Events)
- Date/time fields with optional end dates for multi-day events
- Online vs. in-person toggle
- Capacity tracking and registration links
- Categories: Seminar, Samtalegruppe, Kurs, Dialog

### Statiske Sider (Pages)
Five templates:
- **Homepage** - Hero section, stats, about section, services preview
- **Standard** - General pages with profile image and body content
- **Header** - Simple pages with just title and intro
- **Services** - Service listings with FAQ section
- **Contact** - Contact information with address fields

### Tjenester (Services)
- Sortable by custom order
- Supports multiple pricing tiers
- Rich-text descriptions and detail lists

### Utdanning (Education)
- Simple year/degree/institution format
- Used in "Om meg" section

## Local Development

To develop with TinaCMS locally:

```powershell
npx tinacms dev -c "npm run dev"
```

This starts:
- TanStack Start dev server on `http://localhost:3000`
- TinaCMS admin on `http://localhost:3000/admin`
- Local TinaCMS backend on `http://localhost:4001`

The local admin reads/writes directly to your `/content` folder without requiring Tina Cloud credentials.

## Build Process

The build command in `package.json`:

```json
"build": "tinacms build && vite build"
```

1. `tinacms build` generates the admin UI to `/public/admin/`
2. `vite build` builds the TanStack Start application
3. Both are served together in production

## Simplification Opportunities

✅ **Already Optimized:**
- Single configuration file for all schemas
- Automated slug generation for Norwegian characters (æ → ae, ø → o, å → a)
- Auto-detection of Git branch from Vercel environment
- Integrated build process

🔧 **Current Limitation:**
- The admin interface requires TinaCMS to be running (locally with `tinacms dev` or via Tina Cloud in production)
- Without Tina Cloud credentials, editors must run the dev server locally

## Troubleshooting

**"Unauthorized" error in production:**
- Verify `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN` in Vercel settings
- Ensure the GitHub user has repository access
- Check that the user is logged into Tina Cloud

**Admin page shows error locally:**
- Run `npx tinacms dev -c "npm run dev"` instead of just `npm run dev`
- The standalone dev server needs TinaCMS backend running on port 4001

**Images not loading:**
- Upload images through the CMS to ensure they go to `/public/uploads`
- Reference images in markdown as `/uploads/filename.jpg`

**Content changes not reflecting:**
- Check Git commits in your repository
- TinaCMS commits directly - verify the files changed in `/content`

## Architecture Notes

**Why Git-based?**
- Content version control with full history
- No database to manage or back up
- Content lives with the code
- Easy rollback to previous versions

**Security:**
- Only GitHub repository members can access the CMS
- Content tokens are read/write scoped to your repository
- All edits create Git commits with author attribution

**Performance:**
- Admin UI is a separate build, doesn't affect site bundle size
- Static content is generated at build time
- No runtime CMS queries - content is baked into the site
