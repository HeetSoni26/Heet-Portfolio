# ✅ Domain Updated to Heetbhagwat.me

## Files Updated

All references to your domain have been updated to `Heetbhagwat.me`:

### Core Configuration Files:
1. ✅ `src/lib/constants.ts` - Site URL constant
2. ✅ `src/app/layout.tsx` - Metadata base URL
3. ✅ `src/app/sitemap.ts` - Dynamic sitemap base URL
4. ✅ `.env` - Environment variables (local)
5. ✅ `.env.example` - Example environment variables

### SEO & Public Files:
6. ✅ `public/robots.txt` - Sitemap URL
7. ✅ `public/sitemap.xml` - All page URLs
8. ✅ `src/components/sections/About/About.tsx` - Schema.org metadata

### Email Templates:
9. ✅ `src/app/api/send-email/route.ts` - Auto-reply email template

---

## Environment Variables to Update in Vercel

After deployment, update these in Vercel Dashboard:

### 1. NEXT_PUBLIC_SITE_URL
```
Name: NEXT_PUBLIC_SITE_URL
Value: https://Heetbhagwat.me
Environment: Production, Preview, Development
```

### 2. NEXT_PUBLIC_APP_URL
```
Name: NEXT_PUBLIC_APP_URL
Value: https://Heetbhagwat.me
Environment: Production, Preview, Development
```

### 3. SMTP_FROM (Optional - for professional emails)
```
Name: SMTP_FROM
Value: noreply@Heetbhagwat.me
Environment: Production, Preview, Development
```

---

## DNS Configuration for Heetbhagwat.me

### Step 1: Add Domain in Vercel

1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Domains**
3. Add domain: `Heetbhagwat.me`
4. Also add: `www.Heetbhagwat.me`

### Step 2: Configure DNS Records

Go to your domain registrar (where you bought Heetbhagwat.me):

#### A Record (Root Domain):
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600
```

#### CNAME Record (WWW):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 3: Wait for DNS Propagation

- Typical time: 10 minutes to 2 hours
- Check status: https://dnschecker.org
- Enter: `Heetbhagwat.me`

### Step 4: Verify in Vercel

1. Go to Settings → Domains
2. Wait for green checkmark (Valid Configuration)
3. SSL certificate will be auto-provisioned

---

## After Domain is Active

### 1. Update Environment Variables

In Vercel Dashboard:
- Settings → Environment Variables
- Update `NEXT_PUBLIC_SITE_URL` to `https://Heetbhagwat.me`
- Update `NEXT_PUBLIC_APP_URL` to `https://Heetbhagwat.me`

### 2. Redeploy

- Go to Deployments tab
- Click "Redeploy" on latest deployment
- Wait 2-3 minutes

### 3. Test Your Domain

Visit these URLs to verify:
- ✅ https://Heetbhagwat.me (should load portfolio)
- ✅ https://www.Heetbhagwat.me (should redirect or load)
- ✅ http://Heetbhagwat.me (should redirect to HTTPS)
- ✅ https://Heetbhagwat.me/sitemap.xml (should show sitemap)
- ✅ https://Heetbhagwat.me/robots.txt (should show robots.txt)

### 4. Submit to Search Engines

**Google Search Console:**
1. Add property: `https://Heetbhagwat.me`
2. Verify ownership
3. Submit sitemap: `https://Heetbhagwat.me/sitemap.xml`

**Bing Webmaster Tools:**
1. Add site: `https://Heetbhagwat.me`
2. Verify ownership
3. Submit sitemap

### 5. Update Your Profiles

- ✅ GitHub profile → Website
- ✅ LinkedIn → Contact Info → Website
- ✅ Resume → Portfolio URL
- ✅ Email signature

---

## Email Configuration (Optional)

### Set Up Email Forwarding

Many registrars offer free email forwarding:

**Forward these to your Gmail:**
- `contact@Heetbhagwat.me` → Heetbhagwat019@gmail.com
- `hello@Heetbhagwat.me` → Heetbhagwat019@gmail.com
- `noreply@Heetbhagwat.me` → Heetbhagwat019@gmail.com

This makes your contact form emails look more professional!

---

## What Changed in Email Templates

The auto-reply email now includes:
- Portfolio link: `https://Heetbhagwat.me`
- Professional "View Portfolio" button
- Consistent branding with your domain

---

## Testing Checklist

After domain is active and redeployed:

- [ ] Visit https://Heetbhagwat.me
- [ ] Check HTTPS is working (padlock icon)
- [ ] Test contact form submission
- [ ] Verify auto-reply email has correct domain
- [ ] Check sitemap.xml loads
- [ ] Check robots.txt loads
- [ ] Test on mobile device
- [ ] Verify visitor counter works
- [ ] Check all navigation links work
- [ ] Test in different browsers

---

## Troubleshooting

### Domain Not Loading?

1. Check DNS propagation: https://dnschecker.org
2. Wait 24-48 hours for full propagation
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try incognito/private mode

### SSL Certificate Not Working?

1. Wait 5-10 minutes after DNS validation
2. Check Vercel domain status (should be green)
3. Force HTTPS in browser
4. Contact Vercel support if still failing after 1 hour

### Old Domain Still Showing?

1. Clear browser cache
2. Update environment variables in Vercel
3. Redeploy the project
4. Wait for deployment to complete

---

## Summary

✅ **Domain**: Heetbhagwat.me
✅ **Updated**: 9 files across the codebase
✅ **Email**: Auto-reply template updated
✅ **SEO**: Sitemap and robots.txt updated
✅ **Metadata**: Schema.org and Open Graph updated

**Next Steps:**
1. Configure DNS records at your registrar
2. Add domain in Vercel
3. Update environment variables
4. Redeploy
5. Test everything

Your portfolio will be live at https://Heetbhagwat.me! 🚀
