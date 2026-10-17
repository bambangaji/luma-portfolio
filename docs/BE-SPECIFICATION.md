# Backend Specification — Portfolio Builder Platform

> Generated from FE prototype analysis of `mbg-public-fe`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [FE Repository Summary](#2-fe-repository-summary)
3. [Tech Stack Recommendation (BE)](#3-tech-stack-recommendation-be)
4. [Database Schema](#4-database-schema)
5. [API Endpoints](#5-api-endpoints)
   - [Auth](#51-auth)
   - [Users](#52-users)
   - [Portfolio](#53-portfolio)
   - [Resume](#54-resume)
   - [AI / n8n Integration](#55-ai--n8n-integration)
   - [Search](#56-search)
   - [File Upload](#57-file-upload)
6. [Data Models (JSON Contracts)](#6-data-models-json-contracts)
7. [Authentication & Authorization](#7-authentication--authorization)
8. [n8n Workflow Integration](#8-n8n-workflow-integration)
9. [Environment Variables](#9-environment-variables)
10. [Folder Structure Suggestion](#10-folder-structure-suggestion)

---

## 1. Project Overview

**Portfolio Builder** is a SaaS-like platform that allows users to:

- Upload or input their resume data (JSON / PDF)
- Automatically generate a professional portfolio website from the resume using AI (n8n workflows)
- Manually edit portfolio sections via a CMS-style editor
- Share their portfolio via a public URL (e.g., `/u/:username`)
- Search for other users' portfolios

The FE is built with **React 19 + TypeScript + Vite**, using **Redux Toolkit** and **Zustand** for state management, and **React Router v7** for routing.

---

## 2. FE Repository Summary

### Pages & Routes

| Route | Page | Auth Required |
|-------|------|---------------|
| `/` | Home / Landing | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/forgot-password` | Forgot Password | No |
| `/portfolio-builder` | Portfolio CMS Editor | Yes |
| `/search` | Search Portfolios | No |
| `/about` | About | No |
| `/generate-resume` | Generate Resume | Yes |
| `/:username` | Public Portfolio View | No |

### Key FE Services

| Service | Responsibility |
|---------|---------------|
| `auth.service.ts` | Login, register, token management |
| `user-service.ts` | User CRUD |
| `resume-service.ts` | Resume upload & retrieval |
| `landing-page-service.ts` | Compose portfolio data for rendering |
| `portofolio-mapping-service.ts` | Map `ResumeJson` → `PortfolioJson` |
| `portofolio-merge.service.ts` | Merge AI-generated portfolio with mapped data |
| `portofolio-sanitizer.service.ts` | Sanitize/validate portfolio JSON |
| `pdf-service.ts` | Parse PDF resume |
| `crypto.service.ts` | Encrypt/decrypt sensitive data |

### State Management

| Store | Contents |
|-------|----------|
| `portfolio.store.ts` (Zustand) | Active portfolio JSON, edit state |
| `user-slice.ts` (Redux) | Authenticated user info |

### Portfolio Sections (CMS Editor)

- **Hero** — badge, title (prefix + highlight), description, headline
- **Skills** — categories with score and items
- **Experience** — role, company, dates, description, technologies
- **Projects** — title, description, tags, URL, thumbnail, category
- **Education** — degree, institution, GPA, dates, description
- **Profile** — personal info, socials, image
- **Theme** — color scheme, font, layout preferences

---

## 3. Tech Stack Recommendation (BE)

| Layer | Recommendation | Alternative |
|-------|---------------|-------------|
| Runtime | **Node.js 20+** | Bun |
| Framework | **NestJS** (TypeScript) | Express + Fastify |
| ORM | **Prisma** | TypeORM, Drizzle |
| Database | **PostgreSQL** | MySQL |
| Auth | **JWT** (access + refresh tokens) | Supabase Auth |
| File Storage | **AWS S3** / Cloudflare R2 | MinIO (self-hosted) |
| Cache | **Redis** | In-memory |
| AI Orchestration | **n8n** (self-hosted) | LangChain |
| PDF Parsing | **pdf-parse** / **pdfjs-dist** | Apache Tika |
| Email | **Nodemailer** + SMTP | Resend, SendGrid |
| Validation | **Zod** / class-validator | Joi |
| API Docs | **Swagger / OpenAPI** | — |

---

## 4. Database Schema

### `users`

```sql
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username    VARCHAR(50) UNIQUE NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,          -- bcrypt hashed
  full_name   VARCHAR(255),
  image_url   VARCHAR(500),
  role        VARCHAR(20) DEFAULT 'user',     -- 'user' | 'admin'
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);
```

### `refresh_tokens`

```sql
CREATE TABLE refresh_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  token       TEXT NOT NULL,
  expires_at  TIMESTAMP NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);
```

### `resumes`

```sql
CREATE TABLE resumes (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES users(id) ON DELETE CASCADE,
  raw_json            JSONB NOT NULL,           -- ResumeJson
  pdf_url             VARCHAR(500),             -- uploaded PDF URL
  is_primary          BOOLEAN DEFAULT false,
  created_at          TIMESTAMP DEFAULT NOW(),
  updated_at          TIMESTAMP DEFAULT NOW()
);
```

### `portfolios`

```sql
CREATE TABLE portfolios (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  resume_id       UUID REFERENCES resumes(id),
  portfolio_json  JSONB NOT NULL,               -- PortfolioJson
  theme_config    JSONB,                        -- ThemeConfig
  is_published    BOOLEAN DEFAULT false,
  slug            VARCHAR(100) UNIQUE,          -- public URL slug
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);
```

### `portfolio_sections` (optional — for granular versioning)

```sql
CREATE TABLE portfolio_sections (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id  UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  section_type  VARCHAR(50) NOT NULL,           -- 'hero' | 'skills' | 'experience' | 'projects' | 'education'
  content       JSONB NOT NULL,
  order_index   INTEGER DEFAULT 0,
  updated_at    TIMESTAMP DEFAULT NOW()
);
```

### `password_reset_tokens`

```sql
CREATE TABLE password_reset_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  token       VARCHAR(255) NOT NULL,
  expires_at  TIMESTAMP NOT NULL,
  used        BOOLEAN DEFAULT false,
  created_at  TIMESTAMP DEFAULT NOW()
);
```

---

## 5. API Endpoints

> Base URL: `/api/v1`
> All protected routes require `Authorization: Bearer <access_token>`

---

### 5.1 Auth

#### `POST /auth/register`

Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "full_name": "John Doe"
}
```

**Response `201`:**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "full_name": "John Doe"
  }
}
```

---

#### `POST /auth/login`

Authenticate user and return tokens.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response `200`:**
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "user": {
    "id": "uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "image_url": null,
    "role": "user"
  }
}
```

---

#### `POST /auth/refresh`

Refresh access token using refresh token.

**Request Body:**
```json
{
  "refresh_token": "eyJ..."
}
```

**Response `200`:**
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ..."
}
```

---

#### `POST /auth/logout`

Invalidate refresh token. 🔒 Protected.

**Response `200`:**
```json
{ "message": "Logged out successfully" }
```

---

#### `POST /auth/forgot-password`

Send password reset email.

**Request Body:**
```json
{ "email": "john@example.com" }
```

**Response `200`:**
```json
{ "message": "Password reset email sent" }
```

---

#### `POST /auth/reset-password`

Reset password using token from email.

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "new_password": "NewSecurePass123!"
}
```

**Response `200`:**
```json
{ "message": "Password reset successful" }
```

---

#### `GET /auth/me`

Get current authenticated user. 🔒 Protected.

**Response `200`:**
```json
{
  "id": "uuid",
  "username": "johndoe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "image_url": "https://...",
  "role": "user",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

### 5.2 Users

#### `GET /users` 🔒 Admin only

List all users with pagination.

**Query Params:** `?page=1&limit=20&search=john`

**Response `200`:**
```json
{
  "data": [
    {
      "id": "uuid",
      "username": "johndoe",
      "email": "john@example.com",
      "full_name": "John Doe",
      "role": "user",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "total_pages": 5
  }
}
```

---

#### `GET /users/:id`

Get user by ID (public profile info).

**Response `200`:**
```json
{
  "id": "uuid",
  "username": "johndoe",
  "full_name": "John Doe",
  "image_url": "https://..."
}
```

---

#### `PUT /users/me` 🔒 Protected

Update current user profile.

**Request Body:**
```json
{
  "full_name": "John Doe Updated",
  "image_url": "https://..."
}
```

---

#### `PUT /users/:id` 🔒 Admin only

Update any user (admin).

---

#### `DELETE /users/:id` 🔒 Admin only

Soft-delete a user.

---

### 5.3 Portfolio

#### `GET /portfolio/public/:username`

Get published portfolio by username (public, no auth).

**Response `200`:**
```json
{
  "username": "johndoe",
  "portfolio_json": { /* PortfolioJson */ },
  "theme_config": { /* ThemeConfig */ },
  "resume": { /* ResumeJson */ }
}
```

---

#### `GET /portfolio/me` 🔒 Protected

Get current user's portfolio.

**Response `200`:**
```json
{
  "id": "uuid",
  "portfolio_json": { /* PortfolioJson */ },
  "theme_config": { /* ThemeConfig */ },
  "is_published": true,
  "slug": "johndoe",
  "resume_id": "uuid",
  "created_at": "...",
  "updated_at": "..."
}
```

---

#### `POST /portfolio` 🔒 Protected

Create a new portfolio.

**Request Body:**
```json
{
  "portfolio_json": { /* PortfolioJson */ },
  "theme_config": { /* ThemeConfig */ },
  "resume_id": "uuid",
  "is_published": false
}
```

---

#### `PUT /portfolio/:id` 🔒 Protected

Update portfolio (full or partial).

**Request Body:**
```json
{
  "portfolio_json": { /* PortfolioJson */ },
  "theme_config": { /* ThemeConfig */ },
  "is_published": true
}
```

---

#### `PATCH /portfolio/:id/section` 🔒 Protected

Update a specific section of the portfolio (used by CMS editor).

**Request Body:**
```json
{
  "section": "hero",
  "data": {
    "badge": "Full Stack Developer",
    "title": { "prefix": "Hi, I'm", "highlight": "John Doe" },
    "description": "...",
    "headline": "..."
  }
}
```

Supported `section` values: `hero`, `skill_section`, `experience_section`, `project_section`, `education_section`, `stats`

---

#### `PATCH /portfolio/:id/publish` 🔒 Protected

Toggle publish status.

**Request Body:**
```json
{ "is_published": true }
```

---

#### `DELETE /portfolio/:id` 🔒 Protected

Delete portfolio.

---

### 5.4 Resume

#### `GET /resume/me` 🔒 Protected

Get current user's resume(s).

**Response `200`:**
```json
[
  {
    "id": "uuid",
    "raw_json": { /* ResumeJson */ },
    "pdf_url": "https://...",
    "is_primary": true,
    "created_at": "..."
  }
]
```

---

#### `POST /resume` 🔒 Protected

Create/save a resume from JSON.

**Request Body:**
```json
{
  "raw_json": { /* ResumeJson */ },
  "is_primary": true
}
```

---

#### `POST /resume/upload-pdf` 🔒 Protected

Upload a PDF resume. The BE will:
1. Store the PDF in file storage (S3/R2)
2. Trigger n8n workflow to parse PDF → `ResumeJson`
3. Return the parsed `ResumeJson`

**Request:** `multipart/form-data` with field `file` (PDF)

**Response `200`:**
```json
{
  "resume_id": "uuid",
  "pdf_url": "https://...",
  "raw_json": { /* ResumeJson parsed from PDF */ }
}
```

---

#### `PUT /resume/:id` 🔒 Protected

Update resume JSON.

---

#### `DELETE /resume/:id` 🔒 Protected

Delete a resume.

---

### 5.5 AI / n8n Integration

#### `POST /ai/generate-portfolio` 🔒 Protected

Generate a `PortfolioJson` from a `ResumeJson` using n8n AI workflow.

**Request Body:**
```json
{
  "resume_json": { /* ResumeJson */ }
}
```

**Response `200`:**
```json
{
  "portfolio_json": { /* AI-generated PortfolioJson */ }
}
```

**Internal flow:**
1. BE receives `ResumeJson`
2. BE calls n8n webhook (`/webhook/generate-resume`)
3. n8n processes with LLM (OpenAI/Gemini)
4. n8n returns `PortfolioJson`
5. BE returns result to FE

---

#### `POST /ai/classify-resume` 🔒 Protected

Parse and classify a raw resume text or PDF into structured `ResumeJson`.

**Request Body:**
```json
{
  "raw_text": "John Doe\nSoftware Engineer\n..."
}
```

OR `multipart/form-data` with PDF file.

**Response `200`:**
```json
{
  "resume_json": { /* Classified ResumeJson */ }
}
```

---

### 5.6 Search

#### `GET /search`

Search for published portfolios.

**Query Params:** `?q=john&page=1&limit=12`

**Response `200`:**
```json
{
  "data": [
    {
      "username": "johndoe",
      "full_name": "John Doe",
      "image_url": "https://...",
      "headline": "Full Stack Developer",
      "slug": "johndoe"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 12,
    "total_pages": 5
  }
}
```

---

### 5.7 File Upload

#### `POST /upload/image` 🔒 Protected

Upload profile image or project thumbnail.

**Request:** `multipart/form-data` with field `file` (image)

**Response `200`:**
```json
{
  "url": "https://cdn.example.com/images/uuid.jpg"
}
```

---

## 6. Data Models (JSON Contracts)

### `ResumeJson`

```typescript
interface ResumeJson {
  personal_information: {
    full_name: string;
    email: string;
    phone: string;
    location: {
      city: string;
      province: string;
      country: string;
    };
    image?: string;
    description: string;
  };
  socials: {
    type: string;       // 'linkedin' | 'github' | 'portfolio' | 'whatsapp' | 'email'
    url: string;
    value: string;
  }[];
  education: {
    degree: string;
    institution: string;
    gpa: number;
    start_date: string; // ISO date string
    end_date: string;
    description: string[];
  }[];
  certifications: {
    name: string;
    issuer: string;
    year: number;
    description: string;
  }[];
  experiences: {
    role: string;
    company: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    description: string[];
    technologies: string[];
  }[];
  projects: {
    title: string;
    description: string;
    url: string;
    thumbnail: string;
    technologies: string[];
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
}
```

---

### `PortfolioJson`

```typescript
interface PortfolioJson {
  hero: {
    badge: string;
    title: {
      prefix: string;
      highlight: string;
    };
    description: string;
    headline: string;
    short_description?: string;
  };
  skill_section: {
    title: string;
    subtitle: string;
    categories: {
      category: string;
      score: number;       // 0-100
      items: string[];
    }[];
  };
  experience_section: {
    title: string;
    items: ExperienceItem[];
  };
  project_section: {
    title: string;
    categories: string[];
    items: ProjectItem[];
  };
  stats: {
    label: string;
    value: number;
  }[];
  education_section: {
    degree: string;
    institution: string;
    gpa: number | null;
    start_date: string | null;
    end_date: string | null;
    description: string[];
  }[];
}
```

---

### `ThemeConfig`

```typescript
interface ThemeConfig {
  primary_color: string;    // hex color
  secondary_color: string;
  background_color: string;
  text_color: string;
  font_family: string;
  layout: 'default' | 'minimal' | 'creative';
  dark_mode: boolean;
}
```

---

## 7. Authentication & Authorization

### Strategy

- **Access Token**: JWT, short-lived (15 minutes)
- **Refresh Token**: JWT or opaque token, long-lived (7 days), stored in DB
- **Password**: bcrypt with salt rounds ≥ 12

### Roles

| Role | Permissions |
|------|-------------|
| `user` | CRUD own portfolio, resume, profile |
| `admin` | All user permissions + manage all users |

### Middleware

```
Request → JWT Guard → Role Guard → Controller
```

### Token Flow

```
Login → access_token + refresh_token
↓
access_token expires → POST /auth/refresh → new access_token
↓
refresh_token expires → re-login required
```

---

## 8. n8n Workflow Integration

The FE already has two n8n workflow definitions in `/n8n/`:

### `classification-resume.json`
- **Trigger**: Webhook POST with raw resume text or PDF content
- **Process**: LLM classifies and structures the resume into `ResumeJson`
- **Output**: `{ json: ResumeJson }`

### `generate-resume.json`
- **Trigger**: Webhook POST with `ResumeJson`
- **Process**: LLM generates portfolio content (headlines, descriptions, badge)
- **Output**: `{ portfolio_json: PortfolioJson }`

### BE Integration Pattern

```
FE → POST /ai/generate-portfolio
  → BE validates request
  → BE calls n8n webhook (HTTP POST)
  → n8n processes with LLM
  → n8n responds with result
  → BE returns result to FE
```

### Environment Variables for n8n

```env
N8N_BASE_URL=http://localhost:5678
N8N_WEBHOOK_CLASSIFY_RESUME=/webhook/classify-resume
N8N_WEBHOOK_GENERATE_PORTFOLIO=/webhook/generate-resume
N8N_API_KEY=your-n8n-api-key
```

---

## 9. Environment Variables

```env
# App
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db

# JWT
JWT_ACCESS_SECRET=your-access-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Redis (optional, for caching)
REDIS_URL=redis://localhost:6379

# File Storage (AWS S3 / Cloudflare R2)
STORAGE_PROVIDER=s3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=ap-southeast-1
AWS_S3_BUCKET=portfolio-assets

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@portfolio.com

# n8n
N8N_BASE_URL=http://localhost:5678
N8N_WEBHOOK_CLASSIFY_RESUME=/webhook/classify-resume
N8N_WEBHOOK_GENERATE_PORTFOLIO=/webhook/generate-resume
N8N_API_KEY=your-n8n-api-key

# Crypto (for sensitive data encryption)
CRYPTO_SECRET_KEY=your-32-char-secret-key
```

---

## 10. Folder Structure Suggestion

```
backend/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   └── reset-password.dto.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── strategies/
│   │       └── jwt.strategy.ts
│   │
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── dto/
│   │       └── update-user.dto.ts
│   │
│   ├── portfolio/
│   │   ├── portfolio.controller.ts
│   │   ├── portfolio.service.ts
│   │   ├── portfolio.module.ts
│   │   └── dto/
│   │       ├── create-portfolio.dto.ts
│   │       ├── update-portfolio.dto.ts
│   │       └── update-section.dto.ts
│   │
│   ├── resume/
│   │   ├── resume.controller.ts
│   │   ├── resume.service.ts
│   │   ├── resume.module.ts
│   │   └── dto/
│   │       └── create-resume.dto.ts
│   │
│   ├── ai/
│   │   ├── ai.controller.ts
│   │   ├── ai.service.ts
│   │   └── ai.module.ts
│   │
│   ├── search/
│   │   ├── search.controller.ts
│   │   ├── search.service.ts
│   │   └── search.module.ts
│   │
│   ├── upload/
│   │   ├── upload.controller.ts
│   │   ├── upload.service.ts
│   │   └── upload.module.ts
│   │
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   └── transform.interceptor.ts
│   │   └── pipes/
│   │       └── validation.pipe.ts
│   │
│   ├── prisma/
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   │
│   ├── config/
│   │   └── configuration.ts
│   │
│   └── main.ts
│
├── prisma/
│   └── schema.prisma
│
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Appendix: FE ↔ BE Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                      │
│                                                             │
│  Auth Pages → POST /auth/login|register|forgot-password     │
│  Portfolio Builder → GET|PUT /portfolio/me                  │
│  Section Editor → PATCH /portfolio/:id/section              │
│  PDF Upload → POST /resume/upload-pdf                       │
│  AI Generate → POST /ai/generate-portfolio                  │
│  Public View → GET /portfolio/public/:username              │
│  Search → GET /search?q=...                                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND (NestJS)                        │
│                                                             │
│  JWT Auth Guard → Role Guard → Controllers → Services       │
│  Prisma ORM → PostgreSQL                                    │
│  File Upload → S3/R2                                        │
│  AI Requests → n8n Webhooks → LLM                          │
│  Email → SMTP (Nodemailer)                                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE                            │
│                                                             │
│  PostgreSQL (primary DB)                                    │
│  Redis (cache, optional)                                    │
│  AWS S3 / Cloudflare R2 (file storage)                     │
│  n8n (AI workflow orchestration)                            │
│  SMTP Server (email)                                        │
└─────────────────────────────────────────────────────────────┘
```

---

*Last updated: 2026-07-03 | Based on FE prototype: `mbg-public-fe` commit `c2baffe`*