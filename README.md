# Dragon Crab Farming — Commercial Seafood Aquaculture & Export Platform

High-technology sustainable crab aquaculture, vertical RAS crab apartment systems, and global export-grade live mangrove mud crabs (*Scylla serrata*).

---

## Deploying to Vercel

This repository is pre-configured for one-click deployment on **Vercel** with full-stack support (Vite React frontend + Vercel Serverless Functions backend).

### Option 1: Deploy via GitHub (Recommended)

1. **Push your repository to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your GitHub repository.
   - Vercel will automatically detect the settings from `vercel.json`:
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Serverless API Directory**: `api/`

3. **Configure Environment Variables** (in Vercel Project Settings > Environment Variables):
   - `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API Key for primary live search grounding and live AI trade chat.
   - `OPENAI_API_KEY`: *(Optional)* Your OpenAI API Key (`sk-...`) for automatic dual-engine failover (GPT-4o / GPT-4o-mini).
   *(Note: Even without any API keys, the platform automatically runs on the verified WTO/WCO international customs and biosecurity database with zero disruptions).*

4. **Click Deploy**:
   - Vercel will build the frontend assets, deploy the serverless functions in `api/index.ts`, and provide a production HTTPS URL.

---

### Option 2: Deploy via Vercel CLI

1. Install the Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. Run the deployment command from the project root:
   ```bash
   vercel
   ```

3. To deploy directly to production:
   ```bash
   vercel --prod
   ```

---

## Architecture Overview

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion.
- **Backend on Vercel**: Serverless Functions handled via `api/index.ts` with Express routing.
- **Local Dev Server**: Node.js + Express with Vite middleware (`npm run dev` on port 3000).
- **Core Endpoints**:
  - `POST /api/duty-estimate`: Calculates landed duties, taxes (VAT/GST), and veterinary fees for live mud crab consignments across worldwide export corridors.
  - `POST /api/live-support`: AI-powered real-time live compliance desk answering questions about export directives, health certifications, packaging, and RAS aquaculture.
  - `GET /api/health`: Health status monitor.
