@echo off
echo [CRIRS] Starting Database (Docker)...
docker-compose up -d db

echo [CRIRS] Waiting for database to be ready...
timeout /t 5

echo [CRIRS] Starting Prisma Studio...
start "Prisma Studio" npx prisma studio

echo [CRIRS] Prisma Studio available at: http://localhost:5555

echo [CRIRS] Starting Next.js Development Server...
npm run dev
pause
