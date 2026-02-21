# Vercel Deployment Checklist

If APIs return 500 or CORS errors, check these:

## 1. Environment Variables (Vercel Dashboard)
- **MONGO_URI**: Your MongoDB Atlas connection string
  - Must include `authSource=admin` for Atlas:  
    `...mongodb.net/Backend?retryWrites=true&w=majority&authSource=admin`
  - URL-encode password: `@` → `%40`
- **JWT_SECRET**: Same value you use locally

## 2. MongoDB Atlas Network Access
- Go to MongoDB Atlas → Network Access → Add IP Address
- Click **Allow Access from Anywhere** (`0.0.0.0/0`)
- Vercel uses dynamic IPs; without this, DB connection fails

## 3. Root Directory (if backend is in a subfolder)
- Vercel Project Settings → Root Directory → set to `backend`

## 4. Test Endpoints
- Root: `https://book-file.vercel.app/`
- Health (DB test): `https://book-file.vercel.app/api/health`
- Books: `https://book-file.vercel.app/api/books`

If `/api/health` returns `{"db":"error","message":"..."}`, the DB connection is failing.
