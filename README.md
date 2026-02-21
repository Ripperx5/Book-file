# Book Catalog API

RESTful Book Catalog API with JWT Authentication.

## Local Setup

```bash
npm install
cp .env.example .env
# Edit .env with your MONGO_URI and JWT_SECRET
npm run dev
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Import your GitHub repository
3. Add environment variables:
   - `MONGO_URI` – MongoDB connection string (use `authSource=admin` for Atlas)
   - `JWT_SECRET` – JWT signing secret
4. Deploy
