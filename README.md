<div align="center">
  <br />
    <a href="https://www.figma.com/design/DHmtXXDVTCaAYVWUgwYRvd/Library-Management-System?node-id=0-1&p=f&t=a77u5vMKTBXcmF3v-0" target="_blank">
      <img src="https://github.com/user-attachments/assets/7cff0964-6c02-4af5-aa0c-964b349cc9aa" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="next.js" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=4169E1" alt="postgresql" />
    <img src="https://img.shields.io/badge/-Drizzle_ORM-black?style=for-the-badge&logoColor=white&logo=drizzle&color=224099" alt="drizzle" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-ShadCN_UI-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=black" alt="shadcnui" />

  </div>

  <h3 align="center">A University Library Management System with Admin Panel</h3>

   <div align="center">
     A modern, full-featured library management system built with Next.js, TypeScript, and PostgreSQL
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🧪 [Development Roadmap](#roadmap)
6. 🔗 [Assets](#links)
7. 🚀 [More](#more)

## <a name="introduction">🤖 Introduction</a>

Built with Next.js, TypeScript, and PostgreSQL, the University Library Management System is a production-grade platform featuring a public-facing app and an admin interface. It offers advanced functionalities like seamless book borrowing with reminders and receipts, robust user management, automated workflows, and a modern, optimized tech stack for real-world scalability.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Frontend & Backend**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with ShadCN UI components
- **Authentication**: NextAuth.js
- **Media Processing**: ImageKit
- **Email Service**: EmailJS (replacing Resend)
- **Form Handling**: React Hook Form with Zod validation

## <a name="features">🔋 Features</a>

### User Features

👉 **Authentication System**: Personalized onboarding flow with email notifications  

👉 **Home Page**: Highlighted books and newly added books with 3D effects  

👉 **Library Page**: Advanced filtering, search, and pagination for book discovery  

👉 **Book Detail Pages**: Availability tracking, book summaries, videos, and similar book suggestions  

👉 **Profile Page**: Account management, borrowed books tracking, and receipt downloads  

👉 **Borrowing System**: Seamless book borrowing with automated reminders and receipts  

### Admin Features

👉 **Analytics Dashboard**: Statistics on users, books, and borrowing activity  

👉 **User Management**: View and manage users, approve/revoke access, and change roles  

👉 **Book Management**: Add, edit, and manage library books with advanced search  

👉 **Borrowing Records**: Track and manage all book borrowing activity  

👉 **Account Approval**: Review and approve new user registrations  

### Technical Features

👉 **Responsive Design**: Mobile-first approach with full responsiveness across devices  

👉 **Type Safety**: Comprehensive TypeScript typing throughout the application  

👉 **Error Handling**: Consistent error handling with error boundaries and fallbacks  

👉 **Performance Optimization**: Efficient data fetching and rendering strategies  

👉 **Security**: Authentication, authorization, and data validation  

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)

**Cloning the Repository**

```bash
git clone https://github.com/momed-ali01/university-library.git
cd university-library
```

**Installation**

Install the project dependencies using npm:

```bash
npm install --legacy-peer-deps
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
# Database
DATABASE_URL=

# Auth
AUTH_SECRET=

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=

# API Endpoints
NEXT_PUBLIC_API_ENDPOINT=
NEXT_PUBLIC_PROD_API_ENDPOINT=

# Email Service (EmailJS)
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
```

**Database Setup**

Set up your PostgreSQL database and run the migrations:

```bash
npm run db:generate
npm run db:migrate
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="roadmap">🧪 Development Roadmap</a>

Our development roadmap is organized by priority areas:

### In Progress
- Replacing Resend with EmailJS for email notifications
- Improving application interfaces
- Removing Upstash dependencies

### Upcoming Improvements
- **Code Quality**: Input validation, JSDoc comments, consistent naming conventions
- **Performance**: Server-side pagination, image optimization, caching strategies
- **Security**: CSRF protection, rate limiting, authorization checks
- **Accessibility**: ARIA attributes, keyboard navigation, screen reader support
- **User Experience**: Toast notifications, loading indicators, form validation feedback
- **Architecture**: Component refactoring, state management implementation
- **DevOps**: CI/CD pipeline, automated testing, monitoring

For a detailed list of tasks, see our [tasks.md](./tasks.md) file.

## <a name="links">🔗 Assets</a>

- Assets used in the project can be found [here](https://drive.google.com/file/d/1Q-Wx1Y5W-0tsHCyWLXQ1oLW8x8fnROy_/view?usp=sharing)
- [Watch how to Integrate EmailJS](https://youtu.be/kt0FrkQgw8w?feature=shared&t=13792) in Your Website.
- [Source Code for Integrating EmailJS](https://github.com/adrianhajdin/threejs-portfolio/blob/main/src/sections/Contact.jsx) in any of your codebases.
