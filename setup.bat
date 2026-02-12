@echo off
setlocal

echo [CRIRS] Checking environment...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/ and try again.
    pause
    exit /b 1
)

echo [CRIRS] Starting Database (Docker)...
docker-compose up -d db
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start Docker components. Ensure Docker Desktop is running.
    pause
    exit /b 1
)

echo [CRIRS] Database container started. Waiting for it to be ready...
timeout /t 10

echo [CRIRS] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
)

echo [CRIRS] Pushing database schema...
call npx prisma migrate dev --name init_schema
if %errorlevel% neq 0 (
    echo [ERROR] Failed to push database schema.
    echo Check that your database is running at localhost:5432.
    echo Connection string used: postgresql://user:password@localhost:5432/crirs_db
    pause
    exit /b 1
)

echo [CRIRS] Seeding database...
call npx prisma db seed
if %errorlevel% neq 0 (
    echo [ERROR] Database seeding failed.
    pause
    exit /b 1
)

echo [CRIRS] Setup complete! You can now run 'npm run dev' to start the server.
pause
