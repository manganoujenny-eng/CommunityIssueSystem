# 🚀 GitHub Deployment Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named **CRIRS**
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)
4. Copy the repository URL (e.g., `https://github.com/yourusername/CRIRS.git`)

---

## Step 2: Configure Git (First Time Only)

If you haven't configured git before, run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## Step 3: Commit and Push

### Option A: Using the provided script

Run the following commands in PowerShell:

```powershell
# Add all files to staging
git add .

# Commit with a message
git commit -m "feat: Complete CRIRS system with FCFA support, role-based access, and dynamic dashboard"

# Add your GitHub repository as remote (replace with YOUR repository URL)
git remote add origin https://github.com/yourusername/CRIRS.git

# Push to GitHub
git push -u origin main
```

### Option B: Step-by-step

**1. Check what will be committed:**
```bash
git status
```

**2. Add all changes:**
```bash
git add .
```

**3. Commit with descriptive message:**
```bash
git commit -m "feat: Complete CRIRS implementation

- Added role-based access control (Member, Leader, Admin)
- Implemented FCFA currency localization
- Created dynamic homepage with live database stats
- Added Prisma Studio integration for database management
- Completed financial tracking and issue management
- Added comprehensive README and documentation
"
```

**4. Link to GitHub repository:**
```bash
git remote add origin https://github.com/yourusername/CRIRS.git
```
> ⚠️ **Replace** `yourusername/CRIRS` with your actual GitHub username and repository name!

**5. Push to GitHub:**
```bash
git push -u origin main
```
If your default branch is `master`, use:
```bash
git push -u origin master
```

---

## Step 4: Verify

1. Go to your GitHub repository URL
2. Refresh the page
3. You should see all files, including the beautiful README!

---

## 📸 Optional: Add Screenshots

To make your README even better:

1. Take screenshots of:
   - Homepage
   - Dashboard
   - Issue Management page
   - Financial Dashboard

2. Create a `screenshots/` folder:
```bash
mkdir screenshots
```

3. Add images to the folder (e.g., `homepage.png`, `dashboard.png`)

4. Update README.md to reference them:
```markdown
![Homepage](./screenshots/homepage.png)
```

5. Commit and push:
```bash
git add screenshots/
git commit -m "docs: Add application screenshots"
git push
```

---

## 🔄 Future Updates

When you make changes:

```bash
git add .
git commit -m "your message here"
git push
```

---

## 🆘 Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/yourusername/CRIRS.git
```

### Error: "failed to push"
```bash
git pull --rebase origin main
git push
```

### Want to undo last commit (not pushed yet)?
```bash
git reset --soft HEAD~1
```

---

## 📝 Good Commit Message Examples

- `feat: Add email notification feature`
- `fix: Resolve currency formatting issue in reports`
- `docs: Update installation instructions`
- `refactor: Improve database query performance`
- `style: Format code with Prettier`

---

**Good luck with your GitHub upload! 🎉**
