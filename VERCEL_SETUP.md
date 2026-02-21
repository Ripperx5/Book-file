# Vercel Deployment Checklist

If APIs return 500 or "MONGO_URI is not defined", check these:

## 1. Environment Variables (Vercel Dashboard)

**Important: Redeploy after adding env vars.** Vercel only picks them up on the next deployment.

1. Go to your project → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `MONGO_URI` (exactly, case-sensitive)
   - **Value:** `mongodb+srv://sipungupta2311_db_user:Sipun2311@cluster0.a84qqfx.mongodb.net/Backend?retryWrites=true&w=majority&authSource=admin`
   - **Environments:** Check **Production** and **Preview**
3. Add `JWT_SECRET` the same way
4. **Redeploy:** Deployments → ⋮ on latest → **Redeploy**

Alternative names (MONGO_URI, MONGODB_URI, DATABASE_URL) are supported.

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
