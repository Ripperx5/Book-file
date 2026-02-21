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

1. Initialize Git (if not already):
   ```bash
   git init
   ```

2. Add and commit:
   ```bash
   git add .
   git commit -m "Initial commit"
   ```

3. Create a new repo on GitHub, then:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

## Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New** → **Project**
3. **Import Git Repository** and select your GitHub repo
4. Add environment variables in project settings:
   - `MONGO_URI` – MongoDB connection string
   - `JWT_SECRET` – JWT signing secret
5. Deploy
