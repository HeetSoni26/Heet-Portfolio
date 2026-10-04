# 🚀 Upstash Redis Setup Guide for Visitor Counter

## Overview

Your portfolio uses Upstash Redis (via Vercel Marketplace) to track visitor statistics in real-time. This guide will walk you through the complete setup process.

---

## 📋 What You'll Get

After setup, your visitor counter will track:
- **Unique Visitors**: Total number of unique people who visited
- **Total Visits**: Total page views (including return visits)
- **Today's Visitors**: Unique visitors today (resets daily)

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Deploy Your Portfolio to Vercel First

Before setting up Redis, make sure your portfolio is deployed:

```bash
# Ensure code is pushed to GitHub
git add .
git commit -m "feat: migrate to Upstash Redis for visitor tracking"
git push origin master
```

Then deploy to Vercel (if not already done):
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy (add environment variables as per main guide)

---

### Step 2: Install Upstash Redis from Vercel Marketplace

#### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Marketplace**
   - Visit: https://vercel.com/marketplace
   - Or from your project: Click **"Storage"** tab → **"Browse Marketplace"**

2. **Find Upstash Redis**
   - Search for "Upstash Redis" or "Redis"
   - Click on **"Upstash Redis"** integration

3. **Install Integration**
   - Click **"Add Integration"**
   - Select your Vercel account
   - Click **"Continue"**

4. **Configure Integration**
   - Select your portfolio project
   - Choose a database name: `portfolio-visitors`
   - Select region: **Choose closest to your location** (e.g., US East, EU West, Asia Pacific)
   - Click **"Create Database"**

5. **Connect to Project**
   - The integration will automatically add environment variables to your project:
     - `UPSTASH_REDIS_REST_URL`
     - `UPSTASH_REDIS_REST_TOKEN`
   - Click **"Done"**

#### Option B: Via Upstash Dashboard (Manual)

1. **Create Upstash Account**
   - Go to [upstash.com](https://upstash.com)
   - Sign up with GitHub or email

2. **Create Redis Database**
   - Click **"Create Database"**
   - Name: `portfolio-visitors`
   - Type: **Regional** (cheaper, sufficient for portfolio)
   - Region: Choose closest to your Vercel deployment region
   - Click **"Create"**

3. **Get Credentials**
   - Click on your database
   - Go to **"REST API"** tab
   - Copy:
     - `UPSTASH_REDIS_REST_URL`
     - `UPSTASH_REDIS_REST_TOKEN`

4. **Add to Vercel**
   - Go to your Vercel project
   - Settings → Environment Variables
   - Add both variables (Production, Preview, Development)

---

### Step 3: Redeploy Your Portfolio

After adding the integration:

1. Go to **Deployments** tab in Vercel
2. Click **three dots (...)** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

### Step 4: Verify It's Working

1. **Visit Your Portfolio**
   - Open your deployed site
   - Scroll to the footer

2. **Check Visitor Counter**
   - You should see: "👥 1 visitor" (or current count)
   - The count should increment on each unique visit

3. **Test in Incognito Mode**
   - Open your site in incognito/private window
   - Counter should increment

4. **Check Upstash Dashboard**
   - Go to Upstash dashboard
   - Click on your database
   - Go to **"Data Browser"** tab
   - You should see keys like:
     - `visitors:unique`
     - `visitors:total`
     - `visitors:today:2026-02-27`

---

## 🔍 Troubleshooting

### Issue: Counter Still Shows "Demo Mode" or Fallback Numbers

**Solution:**
1. Verify environment variables are added in Vercel:
   - Go to Settings → Environment Variables
   - Check `UPSTASH_REDIS_REST_URL` exists
   - Check `UPSTASH_REDIS_REST_TOKEN` exists
2. Redeploy after adding variables
3. Clear browser cache and reload

### Issue: Counter Shows 0 Visitors

**Solution:**
- This is normal for a fresh setup
- Visit the site a few times (use different browsers/incognito)
- Counter will start incrementing

### Issue: Environment Variables Not Found

**Solution:**
1. If using Vercel Marketplace integration:
   - Go to Integrations tab
   - Check if Upstash Redis is connected
   - Try disconnecting and reconnecting
2. If manual setup:
   - Double-check variable names (case-sensitive!)
   - Ensure variables are added to all environments

### Issue: "Failed to track visitor" Error

**Solution:**
1. Check Vercel deployment logs for errors
2. Verify Redis database is active in Upstash dashboard
3. Check if region is accessible (some regions may have restrictions)
4. Try recreating the database

---

## 💰 Pricing Information

### Upstash Redis Free Tier (Perfect for Portfolio)

- **10,000 commands/day** (more than enough for a portfolio)
- **256 MB storage**
- **No credit card required**

For a typical portfolio:
- Each visitor = ~5-10 Redis commands
- Free tier supports **1,000-2,000 visitors/day**
- More than sufficient for personal portfolios

### Paid Plans (If You Exceed Free Tier)

- **Pay-as-you-go**: $0.20 per 100K commands
- **Pro Plan**: $10/month for 1M commands/day

---

## 📊 Understanding the Data

### Redis Keys Used

```
visitors:unique              → Set of all unique visitor fingerprints
visitors:total               → Counter for total visits
visitors:today:YYYY-MM-DD    → Set of today's unique visitors (expires daily)
visitors:fingerprint:HASH    → Last visit timestamp for each visitor
```

### How Tracking Works

1. **Visitor arrives** → Generate unique fingerprint (IP + User Agent hash)
2. **Check if new** → Look up fingerprint in Redis
3. **Update counters**:
   - Increment total visits (always)
   - Add to unique visitors (if new)
   - Add to today's visitors (if first visit today)
4. **Return stats** → Display in footer

### Bot Filtering

The system automatically filters out:
- Search engine crawlers (Googlebot, Bingbot, etc.)
- Social media bots (Facebook, Twitter, LinkedIn crawlers)
- Monitoring services
- Known bot user agents

---

## 🔐 Security & Privacy

### Data Stored

- **Hashed fingerprints** (not actual IPs)
- **Visit timestamps**
- **Aggregate counts**

### What's NOT Stored

- ❌ Personal information
- ❌ Raw IP addresses
- ❌ Browsing history
- ❌ User identifiable data

### GDPR Compliance

- No personal data is stored
- Fingerprints are hashed and anonymized
- Data expires automatically (24 hours for fingerprints)
- No cookies are used

---

## 🎯 Testing Locally (Optional)

If you want to test Redis locally:

1. **Get Credentials from Upstash**
   - Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

2. **Add to Local .env**
   ```bash
   UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your-token-here
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Test**
   - Visit http://localhost:3000
   - Check footer for visitor count
   - Should increment on each visit

---

## 📈 Monitoring Your Visitor Stats

### Via Upstash Dashboard

1. Go to [console.upstash.com](https://console.upstash.com)
2. Click on your database
3. Go to **"Metrics"** tab
4. View:
   - Commands per second
   - Storage usage
   - Request latency

### Via Your Portfolio

- Check the footer for real-time stats
- Stats update on each page load

---

## 🔄 Migration from Old Vercel KV

If you previously used `@vercel/kv`, the migration is complete:

✅ **What Changed:**
- Package: `@vercel/kv` → `@upstash/redis`
- Env vars: `KV_REST_API_*` → `UPSTASH_REDIS_REST_*`
- API: Same Redis commands, compatible interface

✅ **What Stayed the Same:**
- All Redis commands work identically
- Data structure unchanged
- Visitor tracking logic unchanged

**Note:** Old data from Vercel KV won't transfer automatically. You'll start with fresh counters.

---

## 🎉 You're All Set!

Your visitor counter is now powered by Upstash Redis and will track real visitor statistics.

### Quick Checklist

- ✅ Upstash Redis integration installed
- ✅ Environment variables added to Vercel
- ✅ Portfolio redeployed
- ✅ Visitor counter showing real numbers
- ✅ Counter incrementing on visits

---

## 📞 Need Help?

- **Upstash Docs**: https://docs.upstash.com/redis
- **Upstash Support**: https://upstash.com/support
- **Vercel Marketplace**: https://vercel.com/marketplace

---

**Last Updated**: February 27, 2026
**Estimated Setup Time**: 5-10 minutes
**Difficulty**: Beginner-friendly

🚀 **Enjoy tracking your portfolio visitors!**
