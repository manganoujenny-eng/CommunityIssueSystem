# 🏘️ CRIRS - Community Resource And Issue Reporting System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A comprehensive web-based platform for community issue management, financial transparency, and data-driven decision-making.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Demo](#-demo)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

CRIRS (Community Resource And Issue Reporting System) empowers local communities to:

- 📢 **Report and track community issues** (infrastructure, sanitation, safety, etc.)
- 💰 **Maintain financial transparency** with real-time budget tracking in FCFA
- 📊 **Make data-driven decisions** using analytics dashboards
- 👥 **Engage citizens** with role-based access (Members, Leaders, Admins)
- 🔒 **Ensure accountability** through secure authentication and audit trails

Built for African communities with localized currency support (Central African CFA Franc) and scalable architecture.

---

## ✨ Features

### For All Users
- ✅ **Dynamic Homepage** - Live statistics from database (grants, issues, announcements)
- ✅ **Responsive Design** - Mobile-first UI with dark/light theme toggle
- ✅ **Secure Authentication** - NextAuth.js with role-based access control
- ✅ **Multi-language Ready** - Localized for Francophone Africa (FCFA currency)

### For Community Members
- 🐛 **Issue Reporting** - Submit problems with categories, priority levels, and locations
- 📍 **Track Progress** - Monitor "My Issues" with real-time status updates
- 📰 **Stay Informed** - View community announcements and updates

### For Leaders & Administrators
- 🎯 **Issue Management** - Assign, prioritize, and resolve reported issues
- 💵 **Financial Dashboard** - Track income/expenses, budgets, and grants (in FCFA)
- 📈 **Analytics & Reports** - Generate insights with interactive charts
- 👤 **User Management** - Admin-only control panel for system configuration
- 🗄️ **Database Viewer** - Integrated Prisma Studio at `localhost:5555`

---

## 🎬 Demo

### Demo Accounts

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Admin** | `admin@crirs.com` | `password123` | Full system access |
| **Leader** | `leader@crirs.com` | `password123` | Manage issues & finances |
| **Member** | `member@crirs.com` | `password123` | Report & track issues |

> **Live Demo**: [Coming Soon]

---

## 📸 Screenshots

<div align="center">

### Homepage
*Dynamic stats showing live issue count, resolved issues, and community grants in FCFA*

### Dashboard
*Role-based views with analytics, recent activity, and personalized insights*

### Issue Management
*Comprehensive issue tracking with filters, status updates, and assignment*

### Financial Transparency
*Budget tracking, transaction history, and expense categorization in FCFA*

</div>

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

### Backend
- **Runtime**: [Node.js 18+](https://nodejs.org/)
- **Database**: [PostgreSQL 15](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)

### DevOps
- **Containerization**: [Docker](https://www.docker.com/)
- **Database Viewer**: [Prisma Studio](https://www.prisma.io/studio)
- **Version Control**: Git

---

## 🚀 Installation

### Prerequisites

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **Docker** (for PostgreSQL) or local PostgreSQL instance
- **Git** for version control

### Quick Start (Windows)

1️⃣ **Clone the repository**
```bash
git clone https://github.com/yourusername/CRIRS.git
cd CRIRS
```

2️⃣ **Run the automated setup**
```bash
./setup.bat
```
This will:
- ✅ Install dependencies
- ✅ Start PostgreSQL (Docker)
- ✅ Generate Prisma Client
- ✅ Apply database schema
- ✅ Seed demo data

3️⃣ **Start the development server**
```bash
./start.bat
```
Access the app at:
- **Application**: http://localhost:3000
- **Prisma Studio**: http://localhost:5555

---

### Manual Installation (Linux/macOS)

1️⃣ **Install dependencies**
```bash
npm install
```

2️⃣ **Configure environment**
```bash
cp .env.example .env
```
Edit `.env` with your database credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/crirs_db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

3️⃣ **Start PostgreSQL**
```bash
docker-compose up -d db
```
Or use your local PostgreSQL instance.

4️⃣ **Setup database**
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5️⃣ **Run development server**
```bash
npm run dev
```

---

## 📖 Usage

### Running the Application

**Development Mode:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm start
```

**Docker (Full Stack):**
```bash
docker-compose up -d
```

### Database Management

**View/Edit Data (Prisma Studio):**
```bash
npx prisma studio
```

**Apply Schema Changes:**
```bash
npx prisma db push
```

**Reset Database:**
```bash
npx prisma db push --force-reset
npx prisma db seed
```

---

## 📁 Project Structure

```
CRIRS/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── dashboard/
│   │   ├── issues/
│   │   ├── financials/
│   │   ├── reports/
│   │   ├── community/
│   │   └── settings/
│   ├── about/               # Help/About page
│   ├── api/                 # API routes
│   │   ├── auth/           # NextAuth.js
│   │   ├── issues/
│   │   └── register/
│   └── page.tsx             # Homepage
├── components/              # Reusable components
│   ├── ui/                 # Shadcn UI components
│   ├── layout/             # Header, Sidebar, Nav
│   ├── dashboard/          # Dashboard widgets
│   ├── issues/             # Issue management
│   ├── financials/         # Finance components
│   └── analytics/          # Charts & analytics
├── lib/                     # Utilities
│   ├── auth.ts             # NextAuth config
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Helper functions
├── prisma/                  # Database
│   ├── schema.prisma       # Data models
│   └── seed.ts             # Seed script
├── public/                  # Static assets
├── .env                     # Environment variables
├── docker-compose.yml       # Docker configuration
├── start.bat                # Windows startup script
└── setup.bat                # Windows setup script
```

---

## 🔌 API Documentation

### Authentication
- `POST /api/auth/signin` - Login user
- `POST /api/register` - Register new user

### Issues
- `GET /api/issues` - Fetch all issues (filtered by role)
- `POST /api/issues` - Create new issue
- `PATCH /api/issues/:id` - Update issue status

### Protected Routes
All dashboard routes require authentication:
- `/dashboard` - Overview (all roles)
- `/issues` - Global issues (Leaders/Admins only)
- `/financials` - Finance tracking (Leaders/Admins only)
- `/reports` - Analytics (Leaders/Admins only)

---

## 🗄️ Database Schema

### Core Models
- **User** - Authentication & profiles (Role: MEMBER | LEADER | ADMIN)
- **Issue** - Community problems with tracking
- **Transaction** - Financial records (Income/Expense in FCFA)
- **Announcement** - System-wide notifications
- **Budget** - Monthly allocations per category
- **Report** - Generated analytics reports

See [`prisma/schema.prisma`](./prisma/schema.prisma) for full schema.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Update documentation for new features

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Inspired by civic tech initiatives across Africa

---

## 📞 Support

For questions or support:
- 📧 Email: support@crirs.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/CRIRS/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/CRIRS/discussions)

---

<div align="center">

**Made with ❤️ for African Communities**

⭐ Star this repo if you find it helpful!

</div>
