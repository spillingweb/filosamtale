# Filosamtale - Official Repository

This repository houses the source code for [Filosamtale](https://www.filosamtale.com/), a web platform dedicated to philosophical dialogue, guidance, and practice. The site is built as a high-performance web application leveraging server-side capabilities, modern UI components, visual content management, and strict data privacy compliance.

## 🛠️ Technology Stack

- **Framework:** [TanStack Start](https://tanstack.com/start/latest) — Full-stack framework built on TanStack Router
- **Core Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/)
- **Headless CMS:** [TinaCMS](https://tina.io/) (Visual editing powered by TinaCloud)
- **Forms & Communications:** [Brevo](https://www.brevo.com/) (GDPR-compliant newsletter & contact routing)
- **Hosting Platform:** [Vercel](https://vercel.com/)

## ⚡ Key Highlights

- **Search Engine Optimization (SEO):** Fine-tuned for organic discovery using semantic HTML5, dynamic metadata, Open Graph cards, and lightweight client assets.
- **Vercel Image Processing:** Assets are optimized on-demand via Vercel’s image optimization engine by prefixing media paths with `/_vercel/image`, minimizing payload sizes.
- **Visual Live Editing:** Content managers can edit text, layout, and images directly on the live page via TinaCMS's contextual editor.
- **GDPR & Privacy First:** User interaction, form submissions, and email distribution lists are routed through Brevo to ensure full EU privacy compliance.

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed/configured prior to development:
* **Node.js** (v18 or higher)
* Package manager of choice (`npm`, `pnpm`, `yarn`, or `bun`)
* An active **[TinaCloud](https://tina.io/)** account and project linked to this repository

### Installation & Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/spillingweb/filosamtale.git
   cd filosamtale
   ```

2. **Install project dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and supply your TinaCloud and Brevo credentials:
   ```env
   # TinaCloud Settings
   TINA_PUBLIC_CLIENT_ID=your_tinacloud_client_id
   TINA_TOKEN=your_tinacloud_read_write_token
   GITHUB_BRANCH=main

   # Brevo Integration
   BREVO_API_KEY=your_brevo_api_key

   # Contact e-mail recieving the contact form messages
   CONTACT_TO_EMAIL=your_contact_email
   ```

4. **Run the local development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## ✍️ Content Administration & Live Editing

Site content is managed visually with **TinaCMS**. 

> **Note:** A configured TinaCloud project is required to enable media management and visual live editing. Ensure your local `.env` keys match your project credentials.

To manage content:
1. Launch the app locally (`npm run dev`).
2. Navigate to `/admin` (`http://localhost:3000/admin`) and log in.
3. Select any editable section directly on the page to preview and update content in real time.
4. Saved changes are automatically committed to the connected Git branch and TinaCloud repository.

## 🔒 Privacy & Form Integrations

All contact form inquiries and newsletter subscriptions are securely dispatched to **Brevo**. This setup ensures end-to-end data processing within European servers, fully complying with GDPR requirements.

## 📄 License

© Filosamtale. All rights reserved.