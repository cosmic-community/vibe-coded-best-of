# Vibe-Coded Best Of

![App Preview](https://imgix.cosmicjs.com/b219b840-a459-11f0-8097-1935875d6ffe-photo-1558655146-9f40138edfeb-1759936559324.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A production-ready newsletter and project showcase platform for the vibe-coding community. Built with Next.js 15, TypeScript, Tailwind CSS, and powered by Cosmic CMS.

## Features

- 🎨 **Editorial Design** - Clean, crisp aesthetic with plenty of whitespace and tasteful typography
- 📝 **Project Submissions** - Full-featured submission form with validation and spam protection
- 🔍 **Advanced Filtering** - Multi-select tool filters, tag-based search, and client-side text search
- 📰 **Newsletter Archive** - Public archive of curated newsletter issues with featured projects
- ✉️ **Email Subscriptions** - Double opt-in subscriber management with confirmation flow
- 🛡️ **Admin Moderation** - Review, approve, reject, and feature project submissions
- 🎯 **SEO Optimized** - Dynamic OpenGraph images, sitemaps, and metadata API integration
- ♿ **Accessible** - 4.5:1 contrast ratios, focus rings, semantic HTML, and ARIA labels
- ⚡ **Performance** - Built for Lighthouse 95+ scores with optimized images and code splitting

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68e67f083393cb29a9184324&clone_repository=68e681d83393cb29a918435b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Project: Vibe-Coded Best Of — Newsletter + Submissions Site
> 
> Use this prompt to generate a production-ready site that showcases the best vibe-coded projects across any tool. The site must be fast, clean, and easy to contribute to.
> 
> Tech stack
> 	•	Next.js 14 (App Router), TypeScript, Tailwind CSS
> 	•	shadcn/ui for components, lucide-react for icons, Framer Motion for subtle entrance fades
> 	•	Deployed via Cosmic AI Platform with Cosmic as the headless CMS
> 	•	Cosmic Webhooks for moderation notifications
> 
> Brand and UX
> 	•	Aesthetic: crisp and editorial. Plenty of whitespace, big type, tasteful cards.
> 	•	Color palette:
> 	•	Background: #FFFFFF
> 	•	Ink: #0F172A
> 	•	Accent: #FCAA0A
> 	•	Muted: #F3F1EC
> 	•	Typography: Inter for UI, Newsreader for headlines
> 	•	Motion: 150–250ms ease for hover and section reveals
> 	•	Accessibility: 4.5:1 contrast, focus rings, semantic landmarks
> 
> Core pages
> 	1.	Home
> 	•	Hero: bold headline, subhead, two CTAs: 'Submit a Project' and 'Subscribe'
> 	•	Latest 6 curated projects (approved only)
> 	•	A 'What is vibe coding' explainer block
> 	•	Email subscribe form (name, email)
> 	2.	Projects
> 	•	Filterable grid of approved submissions
> 	•	Filters: tool used (multi-select), category, tags
> 	•	Search by title and description
> 	3.	Project Detail
> 	•	Title, hero image or generated placeholder
> 	•	What they built, tools used, prompts/notes, tips, highs/lows
> 	•	External links: live site, repo if provided
> 	•	Share buttons
> 	4.	Submit
> 	•	Submission form with validation and spam protection (honeypot + rate limit)
> 	•	After submit: pending review page + email receipt to submitter
> 	5.	About
> 	•	Mission statement, submission guidelines, curation criteria
> 	6.	Newsletter
> 	•	Archive of newsletter issues (public)
> 	•	Single newsletter page
> 
> Content models (Cosmic Object Types)
> 
> Create the following Object Types and Metafields.
> 
> 1) project_submission
> 	•	title (string) — Project name
> 	•	slug (auto)
> 	•	status (select) — values: pending, approved, rejected; default pending
> 	•	author_name (string)
> 	•	author_email (string, private)
> 	•	website_url (string, url)
> 	•	repo_url (string, url, optional)
> 	•	thumbnail (media, optional)
> 	•	description (richtext) — overview of what they built
> 	•	tools_used (multiple select) — seeded with common tools: Cosmic, Lovable, Replit, Cursor, V0, Bolt, Claude, ChatGPT, Vercel, Supabase, Firebase, Netlify, Framer, Webflow, Wix, Bubble, Make, Zapier, Others
> 	•	prompts_or_notes (richtext, optional)
> 	•	tips (richtext, optional)
> 	•	highs (richtext, optional)
> 	•	lows (richtext, optional)
> 	•	tags (tags, optional)
> 	•	featured (boolean, default false)
> 	•	published_at (datetime, optional)
> 
> 2) newsletter_issue
> 	•	title (string)
> 	•	slug (auto)
> 	•	cover_image (media, optional)
> 	•	excerpt (text)
> 	•	body (richtext)
> 	•	featured_projects (relation, multiple, to project_submission, filter approved)
> 	•	issue_number (number)
> 	•	published_at (datetime)
> 
> 3) subscriber
> 	•	name (string, optional)
> 	•	email (string, unique)
> 	•	source (string, default 'site')
> 	•	double_opt_in (boolean, default false)
> 	•	opt_in_token (string, private)
> 	•	confirmed_at (datetime, optional)
> 
> 4) site_settings (singleton)
> 	•	site_name (string) default: 'Vibe-Coded Best Of'
> 	•	tagline (string)
> 	•	logo (media, optional)
> 	•	primary_nav (repeater of label + href)
> 	•	footer_links (repeater)
> 	•	social (repeater of network + url)
> 	•	default_og_image (media)
> 
> Roles and workflow
> 	•	Default submissions land as pending.
> 	•	Admin role can approve or reject. On approval, set status=approved and published_at=now.
> 	•	Only approved appear on Home, Projects, and can be linked inside newsletter issues.
> 	•	Webhook on create project_submission sends moderation email to admins.
> 
> Forms and routes
> 
> Implement Next.js API routes with server actions:
> 	•	POST /api/submit → creates project_submission with pending status
> 	•	Validate: required fields, URL shape, email format
> 	•	Anti-spam: hidden honeypot field portfolio must be empty, and per-IP rate limit 3/hour
> 	•	On success: email receipt to submitter and notify admins
> 	•	POST /api/subscribe → stores subscriber with double_opt_in=false, sends confirmation email with token link /newsletter/confirm?token=...
> 	•	GET /newsletter/confirm → verifies token, sets double_opt_in=true, confirmed_at=now, shows success screen
> 
> Email templates
> 	•	Submission received: subject 'We got your project'
> 	•	Submission approved: subject 'Your project is featured'
> 	•	Confirm your subscription: subject 'Please confirm your subscription'
> 	•	Welcome: subject 'You are in. Best builds incoming'
> 
> Plain, friendly copy. Include the project title when relevant.
> 
> UI details
> 	•	Header: logo left, nav right (Projects, Submit, Newsletter, About). Sticky after scroll.
> 	•	Footer: social icons, quick links, small print.
> 	•	Cards: soft shadows, rounded-2xl, hover lift.
> 	•	Forms: grouped with clear labels, helper text, error states. Use shadcn Form components.
> 	•	Empty state illustrations for zero results.
> 
> Filtering and search
> 	•	Client search across title, description, and tools_used.
> 	•	Server-side tool filters. Combine with search query.
> 	•	Tag pills on cards. Clicking a tag filters the grid.
> 
> SEO
> 	•	Next Metadata API for titles and descriptions
> 	•	OpenGraph image for each project using dynamic OG route /og/project/[slug] pulling title + tools
> 	•	Sitemap and robots
> 
> Copy blocks
> 
> Hero
> 	•	Headline: 'The best vibe-coded builds, in one place'
> 	•	Subhead: 'Discover standout projects from makers using every tool under the sun. Submit yours, subscribe for fresh finds, and get inspired.'
> 	•	CTA primary: 'Submit a Project'
> 	•	CTA secondary: 'Subscribe'
> 
> About blurb
> 'Vibe coding is building at the speed of thought. We highlight the teams and solo builders who turn ideas into working products fast. Tools do not matter. Craft does.'
> 
> Submission sidebar tips
> 	•	Be specific about what you shipped
> 	•	List the tools and why you chose them
> 	•	Share any prompts and lessons learned
> 
> Components to include
> 	•	ProjectCard, ToolFilter, TagPill, NewsletterForm, SubmitForm, EmptyState, ShareButtons, MarkdownRenderer, Prose styles
> 
> Admin utilities
> 	•	/admin/submissions list with approve/reject buttons and quick preview
> 	•	Toggle featured from the list
> 
> Sample data (seed)
> 	•	6 sample project_submission entries with varied tools
> 	•	1 sample newsletter_issue
> 	•	3 sample subscribers (dummy)
> 
> Nice-to-haves
> 	•	RSS feed for newsletter: /rss.xml
> 	•	JSON Feed for projects: /projects/feed.json
> 	•	Click-to-copy prompt snippets on project pages
> 	•	'Built with' badges auto-generated from tools_used
> 
> Success criteria
> 	•	Lighthouse 95+ on desktop, 90+ on mobile
> 	•	Passes basic a11y checks
> 	•	Forms validate and persist to Cosmic
> 	•	Moderation flow works end to end
> 
> ⸻
> 
> Implementation notes for the AI
> 	•	Generate all pages, components, and API routes scaffolded for Cosmic
> 	•	Configure environment variables for Cosmic credentials and email provider
> 	•	Provide README.md with setup steps and where to configure admin email addresses
> 	•	Include unit tests for form validation functions
> 
> Submission form fields (front end)
> 	•	Name (required)
> 	•	Email (required)
> 	•	Website or App URL (required)
> 	•	Repository URL (optional)
> 	•	What did you build? (required, long text)
> 	•	Tools used (multi-select)
> 	•	Prompts or notes (optional)
> 	•	Tips (optional)
> 	•	Highs (optional)
> 	•	Lows (optional)
> 	•	Tags (optional, comma separated)
> 	•	Hidden portfolio field for honeypot
> 
> Final polish
> 	•	Add subtle confetti on successful submission
> 	•	Show toast confirmations for all form actions
> 	•	Animate cards into view on scroll
> 
> Build it clean. Make it fast. Invite everyone to the party."

### Code Generation Prompt

> "Based on the content model I created for 'Project: Vibe-Coded Best Of — Newsletter + Submissions Site', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Forms**: React Hook Form
- **Fonts**: Inter (UI), Newsreader (Headlines)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with bucket credentials

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Approved Projects

```typescript
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects
  .find({
    type: 'project-submissions',
    'metadata.status.key': 'approved'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const projects = response.objects
```

### Creating a Submission

```typescript
await cosmic.objects.insertOne({
  type: 'project-submissions',
  title: formData.title,
  metadata: {
    status: 'Pending Review',
    author_name: formData.name,
    author_email: formData.email,
    website_url: formData.websiteUrl,
    description: formData.description,
    tools_used: formData.tools
  }
})
```

### Updating Project Status

```typescript
await cosmic.objects.updateOne(projectId, {
  metadata: {
    status: 'Approved',
    published_at: new Date().toISOString()
  }
})
```

## Cosmic CMS Integration

This application uses Cosmic as a headless CMS with the following content structure:

- **Project Submissions** (`project-submissions`) - User-submitted projects with moderation workflow
- **Newsletter Issues** (`newsletter-issues`) - Curated newsletter content with featured projects
- **Subscribers** (`subscribers`) - Email list with double opt-in confirmation
- **Site Settings** (`site-settings`) - Global configuration (singleton)

All content is managed through Cosmic's dashboard with a complete moderation workflow for submissions.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Environment Variables

Set these in your hosting platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Read API key from Cosmic
- `COSMIC_WRITE_KEY` - Write API key for submissions

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (routes)/          # Route groups
│   │   ├── page.tsx       # Homepage
│   │   ├── projects/      # Projects listing & detail
│   │   ├── submit/        # Submission form
│   │   ├── newsletter/    # Newsletter archive
│   │   ├── about/         # About page
│   │   └── admin/         # Admin moderation panel
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utilities and config
│   ├── cosmic.ts         # Cosmic SDK client
│   └── types.ts          # TypeScript definitions
└── public/               # Static assets
```

## License

MIT

<!-- README_END -->