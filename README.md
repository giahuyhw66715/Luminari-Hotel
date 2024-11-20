# Luminari Hotel Website

Luminari is a modern hotel booking website built to provide seamless booking experiences with an elegant user interface. This project leverages the power of cutting-edge technologies to ensure high performance, maintainability, and ease of development.

## ✨ Technologies Used

-   **[Next.js](https://nextjs.org/)**: React-based framework for server-side rendering and static site generation.
-   **[TypeScript](https://www.typescriptlang.org/)**: Strongly typed JavaScript to enhance code quality and maintainability.
-   **[PostgreSQL](https://www.postgresql.org/)**: Relational database management system for efficient data handling.
-   **[Prisma](https://www.prisma.io/)**: Next-generation ORM for database management with TypeScript support.
-   **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
-   **[Shadcn](https://shadcn.dev/)**: Component library integrated with Tailwind CSS to simplify UI creation.
-   **[Clerk](https://clerk.dev/)**: Authentication and user management service to secure the platform.

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Prerequisites

-   **Node.js**: Ensure Node.js is installed on your system [Download Node.js](https://nodejs.org).
-   **PostgreSQL**: Install and configure PostgreSQL [Download PostgreSQL](https://www.postgresql.org/).
-   **Clerk Account**: Set up an account at [Clerk](https://clerk.dev/) to manage authentication.

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/luminari-hotel.git
cd luminari-hotel
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="postgresql://user:passwrod@localhost:5432/luminari-hotel"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLIC_KEY
CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_NAME
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLIC
NEXT_PUBLIC_STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET
STRIPE_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET
HOTEL_URL=http://localhost:3000
```

Replace `user`, `password`, **Stripe keys**, **Cloudinary keys** and the **Clerk API keys** with your actual values.

### 5. Run Migrations

```bash
npx prisma migrate dev --name init
```

This will initialize the database schema.

### 6. Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to see the app.

---

## 🏗️ Project Structure

```
/components     # Reusable React components
/app            # Next.js app (routes)
/prisma         # Database schema and migrations
/public         # Static assets
/utils          # Helper functions
/types          # Typescript defined type
/lib            # Set up server action and schema
/store          # Zustand store for cart in local storage
```

---

## ✨ Features

-   **Dynamic Routing**: Powered by Next.js for efficient page navigation.
-   **Booking System**: Manage bookings with PostgreSQL-backed storage.
-   **Authentication**: Secure authentication using Clerk for user management.
-   **Responsive Design**: Tailwind CSS ensures a smooth experience on all devices.
-   **Theming Support**: Shadcn components integrated for customization.
-   **Type Safety**: TypeScript ensures fewer runtime errors and better code documentation.

---

## 📦 Available Scripts

-   **`npm run dev`**: Starts the development server.
-   **`npx prisma studio`**: Launches Prisma Studio for database inspection.
