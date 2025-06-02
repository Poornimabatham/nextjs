This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

Project Setup
This project is a Next.js application with authentication powered by Supabase Auth, API routes and type-safe backend with tRPC, database access using Prisma, and styling done with Tailwind CSS.

Prerequisites
Node.js (v18+ recommended)

npm or yarn

A Supabase project (for authentication and database)

PostgreSQL database configured for Prisma (can be local or cloud)

1.Steps to Run Locally
Clone the repository

bash
Copy
Edit
git clone https://github.com/Poornimabatham/nextjs.git
cd NEXTJS1
Install dependencies

Install all required packages as listed in package.json:

bash
Copy
Edit
npm install

# or

yarn install
Configure environment variables

Create a .env.local file at the root of the project and add your environment variables:

env
Copy
Edit
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

DATABASE_URL=your-database-connection-string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret
NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY come from your Supabase project.

DATABASE_URL is your PostgreSQL connection string for Prisma.

NEXTAUTH_SECRET is a random string used by NextAuth.js for session encryption. You can generate one with openssl rand -base64 32 or use an online generator.

Set up Prisma

Generate Prisma client and run migrations:

bash
Copy
Edit
npx prisma generate
npx prisma migrate dev --name init
Run the development server

Start the Next.js app locally:

bash
Copy
Edit
npm run dev

# or

yarn dev
Open your browser at http://localhost:3000 to view the app.

Key Technologies Used
Next.js v15.1.8: React framework for server-rendered apps.

Supabase Auth: For authentication and user management.

Prisma: Type-safe ORM for interacting with your PostgreSQL database.

tRPC: Type-safe APIs between frontend and backend.

Tailwind CSS: Utility-first CSS framework for styling.

NextAuth.js: Authentication library integrated with Supabase.

React Query: Data fetching and caching.
