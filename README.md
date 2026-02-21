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
3. **If backend is in a subfolder**: Set **Root Directory** to `backend` in Project Settings
4. Add environment variables:
   - `MONGO_URI` – MongoDB connection string (include `&authSource=admin` for Atlas)
   - `JWT_SECRET` – JWT signing secret
5. Deploy

### Vercel "FUNCTION_INVOCATION_FAILED" – Checklist

- **Root Directory**: If your repo has a `backend` folder, set Root Directory to `backend` in Vercel Project Settings
- **Environment variables**: Ensure `MONGO_URI` and `JWT_SECRET` are set in Vercel
- **MongoDB Atlas Network Access**: Add `0.0.0.0/0` to allow connections from anywhere (Vercel uses dynamic IPs)
- **authSource**: Add `&authSource=admin` to your MONGO_URI in Vercel
