# SSS — Solutions Services & Supplies Website

Professional website for SSS (Solutions Services & Supplies), Lahore, Punjab, Pakistan.

---

## 📁 Project Structure

```
sss-website/
├── index.html              # Home page
├── services.html           # Services page
├── projects.html           # Projects & Portfolio page
├── contact.html            # Contact Us page
├── assets/
│   ├── logo.jpg            # SSS company logo
│   └── images/             # All project/service images
├── api/
│   └── contact.js          # Serverless email function (Vercel)
├── vercel.json             # Vercel configuration
├── package.json            # Node.js dependencies
└── .gitignore
```

---

## 🚀 Deployment Guide — Vercel (Step by Step)

### Step 1 — Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon (top right) → **New repository**
3. Name it: `sss-website`
4. Keep it **Public** (free Vercel deployment)
5. Click **Create repository**

### Step 2 — Upload Files to GitHub

1. On the new repo page, click **uploading an existing file**
2. Drag and drop the entire `sss-website` folder contents
3. OR use Git commands:

```bash
cd sss-website
git init
git add .
git commit -m "Initial SSS website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sss-website.git
git push -u origin main
```

### Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/in with your GitHub account
2. Click **Add New → Project**
3. Find and select your `sss-website` repository → click **Import**
4. Leave all settings as default
5. Click **Deploy**
6. Wait ~60 seconds — your site will be live! 🎉

### Step 4 — Set Up Email Environment Variables (IMPORTANT!)

The contact form needs email credentials to send messages. Do this **after deploying**:

1. In your Vercel dashboard, open your `sss-website` project
2. Go to **Settings → Environment Variables**
3. Add these two variables:

| Name | Value |
|------|-------|
| `EMAIL_USER` | `usman293eb@gmail.com` |
| `EMAIL_PASS` | *(your Gmail App Password — see below)* |

4. Click **Save** then go to **Deployments → Redeploy**

---

### 📧 How to Get Your Gmail App Password

Gmail requires an "App Password" instead of your regular password for sending emails programmatically.

1. Go to your Google Account: [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left sidebar
3. Under "How you sign in to Google", click **2-Step Verification** (enable it if not already)
4. Scroll down and click **App passwords**
5. Select app: **Mail** → Select device: **Other** → type `SSS Website`
6. Click **Generate** — copy the 16-character password shown
7. Paste that password as the `EMAIL_PASS` environment variable in Vercel

---

## ✅ After Deployment Checklist

- [ ] Visit your live site URL (e.g., `sss-website.vercel.app`)
- [ ] Test all 4 pages load correctly
- [ ] Test the contact form — submit a test message
- [ ] Check that you receive the email at `usman293eb@gmail.com`
- [ ] Check the auto-reply goes to the sender

---

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Fonts**: Syne + DM Sans (Google Fonts)
- **Animations**: AOS (Animate on Scroll)
- **Backend**: Vercel Serverless Function (Node.js)
- **Email**: Nodemailer via Gmail SMTP
- **Hosting**: Vercel (free tier)

---

## 📞 Contact

**SSS — Solutions Services & Supplies**  
Lahore, Punjab, Pakistan  
Phone: 042-3543673  
Email: usman293eb@gmail.com  
NTN: 3530218699626 | PEC: 85282_C6_EE07-EE08
