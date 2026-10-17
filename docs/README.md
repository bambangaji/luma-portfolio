# LUMA PORTFOLIO

> AI-powered Portfolio Generator & Builder — Turn your resume into a stunning portfolio in minutes.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Key Components](#key-components)
- [Services](#services)
- [State Management](#state-management)
- [Internationalization](#internationalization)
- [Getting Started](#getting-started)

---

## Overview

**LUMA PORTFOLIO** is a React-based Single Page Application (SPA) that enables users to generate professional portfolio websites directly from their resume/CV. The core workflow is:

1. Upload a PDF resume
2. AI parses and classifies the resume content
3. A structured portfolio is generated automatically
4. User can preview, edit, and customize the portfolio via a CMS-style editor
5. Portfolio is ready to share or publish

The platform supports multiple professional fields including Photography, Accounting, Design, Engineering, Healthcare, Education, and more.

---

## Features

| Feature | Description |
|---|---|
| 🤖 AI Resume Parsing | Upload a PDF resume; AI extracts and classifies structured data |
| 🎨 Portfolio Builder | CMS-style editor with live preview |
| 🌗 Dark / Light Mode | Global theme toggle with smooth transitions |
| 🌐 Multi-language | i18n support with language toggle |
| 📊 Skills Charts | Circle/radar charts for skill visualization |
| 📅 Date Picker | Calendar-based date picker for experience & education |
| 🔐 Authentication | Login, Register, Forgot Password flows |
| 👁️ Live Preview | Real-time portfolio preview while editing |
| 🖼️ Thumbnail View | Portfolio thumbnail previews |
| 📋 Example Portfolios | Pre-built examples for Design and Accounting fields |

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite |
| **Routing** | React Router DOM v7 |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion (motion) |
| **State Management** | Zustand + Redux Toolkit |
| **Internationalization** | i18next / react-i18next |
| **PDF Parsing** | pdfjs-dist, pdf-parse |
| **Charts** | Recharts |
| **Notifications** | Sonner (toasts), SweetAlert2 |
| **Icons** | Lucide React, FontAwesome |
| **Date Picker** | react-datepicker, react-day-picker |
| **Backend Automation** | n8n workflows (AI classification & generation) |

---

## Project Structure

```
mbg-public-fe/
├── docs/                          # Documentation
├── n8n/                           # n8n workflow JSONs
│   ├── classification-resume.json # AI resume classification workflow
│   └── generate-resume.json       # AI resume generation workflow
├── public/                        # Static assets
│   ├── profile.png
│   └── resume.pdf
├── src/
│   ├── App.tsx                    # Root app component (theme, layout, routing)
│   ├── main.tsx                   # Entry point
│   ├── assets/                    # Images and static assets
│   ├── components/                # Reusable UI components
│   │   ├── app-header.tsx
│   │   ├── navbar.tsx
│   │   ├── navigations.tsx
│   │   ├── footer.tsx
│   │   ├── language-toggle.tsx
│   │   ├── picker/                # Date picker components
│   │   ├── portofolio-editor/     # CMS editor panels
│   │   │   ├── cms-sidebar.tsx
│   │   │   ├── editor-panel.tsx
│   │   │   ├── accordion-sections.tsx
│   │   │   ├── floating-button.tsx
│   │   │   ├── button-menu.tsx
│   │   │   ├── hero-editor.tsx
│   │   │   ├── profile-editor.tsx
│   │   │   ├── experience-editor.tsx
│   │   │   ├── experinece-item-editor.tsx
│   │   │   ├── project-editor.tsx
│   │   │   ├── project-item-editor.tsx
│   │   │   ├── skills-editor.tsx
│   │   │   ├── skills-category-editor.tsx
│   │   │   ├── education-editor.tsx
│   │   │   ├── education-item-editor.tsx
│   │   │   └── theme-editor.tsx
│   │   ├── sections/              # Portfolio section renderers
│   │   │   ├── hero-section.tsx
│   │   │   ├── about-section.tsx
│   │   │   ├── contact-section.tsx
│   │   │   ├── experience-section.tsx
│   │   │   ├── experience-section-two.tsx
│   │   │   ├── projects-section.tsx
│   │   │   ├── skills-section.tsx
│   │   │   ├── section-circle-chart.tsx
│   │   │   └── section-pick-calendar.tsx
│   │   ├── user/                  # User-related components
│   │   │   └── user-list.tsx
│   │   └── views/                 # View components
│   │       ├── portofolio-view.tsx
│   │       └── thumbnail-view.tsx
│   ├── data/                      # Static data / JSON templates
│   │   └── template-json-classification.json
│   ├── features/                  # Feature modules
│   ├── hooks/                     # Custom React hooks
│   ├── i18n/                      # Internationalization config
│   ├── interface/                 # TypeScript interfaces
│   │   ├── portofolio-json.interface.ts
│   │   └── resume-json.interface.ts
│   ├── pages/                     # Page-level components
│   │   ├── landing-page.tsx
│   │   ├── about.tsx
│   │   ├── not-found.tsx
│   │   ├── generate-resume.tsx
│   │   ├── portfolio-builder-page.tsx
│   │   ├── searching-page.tsx
│   │   ├── auth/
│   │   │   ├── login-page.tsx
│   │   │   ├── register-page.tsx
│   │   │   └── forgot-password-page.tsx
│   │   ├── bambang-aji-pangestu/
│   │   │   └── bambang-aji-pangestu-page.tsx
│   │   ├── examples/
│   │   │   ├── design-example-page.tsx
│   │   │   └── accounting-example-page.tsx
│   │   ├── item/
│   │   │   └── item-detail-page.tsx
│   │   └── whatsapp/
│   │       └── whatsapp-page.tsx
│   ├── router/
│   │   └── index.tsx              # React Router configuration
│   ├── services/                  # Business logic & API services
│   │   ├── landing-page-service.ts
│   │   ├── portofolio-merge.service.ts
│   │   └── portofolio-mapping-service.ts
│   └── store/
│       └── portfolio.store.ts     # Zustand portfolio store
└── utils/
    └── helpers.py                 # Python utility helpers
```

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Landing Page | Marketing page with hero, features, reviews, CTA |
| `/bambang-aji-pangestu` | Example Portfolio | Live example portfolio (Bambang Aji Pangestu) |
| `/generate-resume` | Generate Resume | Upload PDF resume for AI processing |
| `/portofolio-editor` | Portfolio Builder | CMS-style portfolio editor with live preview |
| `/login` | Login | User authentication |
| `/register` | Register | New user registration |
| `/forgot-password` | Forgot Password | Password recovery |
| `/examples/design` | Design Example | Pre-built Design field portfolio example |
| `/examples/accounting` | Accounting Example | Pre-built Accounting field portfolio example |
| `/search` | Search | Search functionality |
| `/whatsapp` | WhatsApp | WhatsApp integration page |
| `/product/:id` | Item Detail | Product/item detail page |
| `/about` | About | About page |
| `*` | 404 Not Found | Catch-all not found page |

> **Note:** Navigation bar is only shown on `/bambang-aji-pangestu`, `/examples/design`, and `/examples/accounting` routes.

---

## Key Components

### App Root (`src/App.tsx`)
- Manages global dark/light mode state
- Conditionally renders the `Navigation` bar based on current route
- Provides `isDark` context to child routes via `Outlet`
- Renders `Toaster` for global toast notifications

### Portfolio Editor (`src/components/portofolio-editor/`)
A full CMS-style editor with the following section editors:

| Editor | Section |
|---|---|
| `hero-editor.tsx` | Hero / banner section |
| `profile-editor.tsx` | Profile / personal info |
| `experience-editor.tsx` + `experinece-item-editor.tsx` | Work experience |
| `project-editor.tsx` + `project-item-editor.tsx` | Projects |
| `skills-editor.tsx` + `skills-category-editor.tsx` | Skills & categories |
| `education-editor.tsx` + `education-item-editor.tsx` | Education |
| `theme-editor.tsx` | Theme / color customization |
| `cms-sidebar.tsx` | Sidebar navigation for editor |
| `editor-panel.tsx` | Main editor panel container |
| `accordion-sections.tsx` | Collapsible section list |

### Portfolio Sections (`src/components/sections/`)
Rendered portfolio sections for the live preview:

- `hero-section.tsx` — Name, title, tagline
- `about-section.tsx` — Bio / about me
- `contact-section.tsx` — Contact information
- `experience-section.tsx` / `experience-section-two.tsx` — Work history (two layout variants)
- `projects-section.tsx` — Project showcase
- `skills-section.tsx` — Skills list
- `section-circle-chart.tsx` — Circular skill chart (Recharts)
- `section-pick-calendar.tsx` — Calendar-based date display

---

## Services

| Service | Description |
|---|---|
| `landing-page-service.ts` | Data/logic for the landing page |
| `portofolio-merge.service.ts` | Merges AI-generated data with user edits |
| `portofolio-mapping-service.ts` | Maps resume JSON structure to portfolio JSON structure |

---

## State Management

- **Zustand** (`src/store/portfolio.store.ts`) — Primary store for portfolio data (editor state, sections, theme)
- **Redux Toolkit** — Available for additional global state needs

---

## Internationalization

The app uses **i18next** with **react-i18next** for multi-language support.

- Config located in `src/i18n/`
- Language toggle component: `src/components/language-toggle.tsx`
- All user-facing strings in the landing page and UI use `t('key')` translation keys

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/bambangaji/my-portofolio.git
cd mbg-public-fe

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Supported Professional Fields

The platform supports portfolio generation for a wide range of professions:

- 📸 Photography
- 📊 Accounting
- 🛍️ Retail
- 🏥 Healthcare
- 🍳 Culinary
- 🎨 Design
- 🏗️ Engineering
- 📚 Education
- ⚖️ Legal
- 🎵 Music
- ✈️ Hospitality
- 💼 Sales

---

## n8n Workflows

The `n8n/` directory contains automation workflow JSONs used for AI-powered resume processing:

| File | Purpose |
|---|---|
| `classification-resume.json` | Classifies resume content into structured categories |
| `generate-resume.json` | Generates portfolio data from classified resume |

These workflows are designed to be imported into an [n8n](https://n8n.io) instance and connected to the frontend via API calls.

---

*LUMA PORTFOLIO — © 2024. Built with React, TypeScript, and Tailwind CSS.*