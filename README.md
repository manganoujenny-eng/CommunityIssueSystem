# Community Resource And Issue Reporting System (CRIRS)

A comprehensive web-based system enabling structured community issue reporting, transparent fund tracking, and data-driven decision-making. Built with Next.js 14, PostgreSQL, and Shadcn UI.

## Features

- **Role-Based Dashboards**: Tailored views for Members, Leaders, and Admins.
- **Issue Reporting**: Multi-step forms with categorization, priority, and location.
- **Financial Tracking**: Double-entry accounting for community funds (Income/Expenses).
- **Analytics**: Real-time charts and data visualization.
- **Authentication**: Secure login/registration with NextAuth.js.
- **Responsive Design**: Mobile-first UI using Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **UI**: Tailwind CSS, Shadcn UI, Lucide Icons
- **Auth**: NextAuth.js (Credentials)
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (Local or Docker)

### Installation using Setup Script (Windows)

1.  **Double-click** `setup.bat` in the project folder.
2.  This will check for Node.js, install `npm` dependencies, set up the database configuration, and seed the initial data.
3.  Once finished, run the server:
    ```bash
    npm run dev
    ```

### Manual Installation

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    Copy `.env.example` to `.env` and update your database credentials.
    ```bash
    cp .env.example .env
    ```

3.  **Database Setup**:
    ```bash
    # Generate Prisma Client
    npx prisma generate

    # Push schema to database
    npx prisma db push

    # Seed initial data (Admin/Leader/Member accounts)
    npx prisma db seed
    ```
    *Note: Seed script creates `admin@crirs.com`, `leader@crirs.com`, `member@crirs.com` with password `password123`*

### Running the Application

**Option 1: Quick Start (Recommended)**
Double-click `start.bat`. This will:
1. Start the Docker database.
2. Launch the Next.js development server.

**Option 2: Manual Start**
1. Ensure database is running (`docker-compose up -d db`).
2. Run the server:
    ```bash
    npm run dev
    ```

### Troubleshooting

- **Node.js not found**: Please install the latest LTS version from [nodejs.org](https://nodejs.org/).
- **Database connection error**: Ensure your PostgreSQL server is running. If you have Docker installed, you can use the provided `docker-compose.yml`:
    ```bash
    docker-compose up -d db
    ```
- **Prisma Seed Error**: If seeding fails, try running `npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" prisma/seed.ts` manually.

### Docker Deployment

To run the entire stack with Docker Compose:

```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `/app`: Next.js App Router pages and API routes
- `/components`: Reusable UI components and feature-specific views
- `/lib`: Utility functions and configuration (Prisma, Auth)
- `/prisma`: Database schema and seed script

## License

MIT
