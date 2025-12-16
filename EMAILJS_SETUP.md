# EmailJS Setup Guide

Your contact form is now configured to use EmailJS. Follow these steps to set it up:

## Step 1: Create an EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (100 emails/month)
3. Verify your email address

## Step 2: Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred provider)
4. Connect your Gmail account: `rafael.contacto.dev@gmail.com`
5. Copy the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

**Subject:**
```
New Contact from {{from_name}} - {{subject}}
```

**Body:**
```
Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}
```

4. Copy the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `user_AbCdEfG123`)

## Step 5: Update Environment Variables
1. Open `.env.local` in your project root
2. Replace the placeholder values with your actual IDs:
```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Note:** `.env.local` is already in `.gitignore`, so your credentials won't be pushed to GitHub.

## Done!
Your contact form will now send emails directly to `rafael.contacto.dev@gmail.com` without needing an email client installed.

## Testing
1. Run `npm run dev`
2. Fill out the contact form
3. Submit and check your Gmail inbox
