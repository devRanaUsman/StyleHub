# Repository Notes

- **Project Location**: `d:\Stylish Hub app`
- **Primary Stack**:
  - Frontend: React 19 + Vite + TailwindCSS + Bootstrap
  - Authentication: Clerk (OAuth + Email/Password)
  - State Management: Redux Toolkit
  - Backend: Node.js + Express + MongoDB (Mongoose)
  - Routing: React Router DOM v7
  - Animation: Framer Motion
- **Key Architecture**:
  1. Frontend in `/src` - React components, routes, services
  2. Backend in `/2-actual-backend` - Express controllers, models, routes
  3. Authentication: Clerk integration for secure auth flow
  4. Database: MongoDB with Mongoose ODM
- **Authentication System**:
  - Clerk handles user management, OAuth (Google), email/password
  - Conditional UI rendering based on auth state
  - Protected routes for authenticated features
- **Testing Framework**: `targetFramework: Playwright`

Keep this document updated with any significant architectural details or troubleshooting tips discovered during analysis.
