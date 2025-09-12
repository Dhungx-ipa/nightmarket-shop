# Overview

This is a Vietnamese language rental service platform called "Nightmarket" that provides premium digital services at affordable prices. The application offers rental services for popular platforms like Apple ID, Netflix Premium, Discord Nitro, YouTube Premium, and Spotify Premium. It also includes features for Apple ID key validation, module sharing, and administrative management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for type safety
- **Wouter** for lightweight client-side routing instead of React Router
- **TailwindCSS** with custom CSS variables for dark theme styling
- **Shadcn/ui** component library with Radix UI primitives for accessible components
- **React Hook Form** with Zod validation for form handling
- **TanStack Query** for server state management and API caching
- **Vite** as the build tool and development server

## Backend Architecture
- **Express.js** server with TypeScript
- **PostgreSQL** database with Drizzle ORM for type-safe database operations
- **Session-based authentication** with in-memory storage for admin users
- **Input sanitization** using DOMPurify for XSS protection
- **Rate limiting** with different limits for general API and authentication endpoints
- **Security headers** via Helmet middleware

## Database Design
The application uses PostgreSQL with the following main entities:
- **Services**: Premium service offerings with pricing and availability status
- **Inquiries**: Customer service requests and contact information
- **Admin Users**: Administrative accounts with hashed passwords
- **Apple ID Keys**: Reusable keys for Apple ID access with usage tracking
- **Modules**: Downloadable modules/resources for users

## Authentication & Security
- **Admin authentication** using bcrypt for password hashing
- **Session tokens** stored in memory (production should use Redis)
- **Rate limiting** to prevent abuse
- **Input sanitization** to prevent XSS attacks
- **CORS and security headers** configuration

## File Structure
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript schemas and types
- `migrations/` - Database migration files
- Component organization following atomic design principles

# External Dependencies

## Database
- **Neon Database** (PostgreSQL) via `@neondatabase/serverless`
- **Drizzle ORM** for database operations and migrations

## UI Framework
- **Radix UI** components for accessibility
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Icons** for brand icons

## Development Tools
- **Vite** for bundling and development
- **TypeScript** for type safety
- **ESBuild** for production builds

## Third-party Services
- **Advertisement integration** via external ad networks (highperformanceformat.com)
- **Discord integration** for customer support
- **External links** to PhimXuyenDem and SideStore services

## Security & Validation
- **Zod** for runtime type validation
- **DOMPurify** for input sanitization
- **bcrypt** for password hashing
- **Helmet** for security headers

The application follows a monorepo structure with shared schemas between frontend and backend, ensuring type safety across the entire stack.