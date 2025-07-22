# White-Label Branding Setup

This guide explains how to brand RoyaltyX as your own platform and resell it to clients.

## 1. Customize the Frontend

1. Replace the logo files in `frontend/src/modules/common/assets/img/brand/` with your branding.
2. Update the `REACT_APP_URL` and `REACT_APP_API_URL` values in your `.env` file to match your custom domain.
3. Rebuild the Docker containers for the changes to take effect.

## 2. Custom Domain & Login Screen

Set up DNS records for your domain to point to your hosting provider. Configure the `nginx` container to respond to your domain by editing `nginx/nginx.conf`.

The login screen automatically uses the logo files from step 1. No code changes are required.

## 3. Resell Pricing

Wholesale pricing starts at **$25 per seat per month**. You are free to set your own resale price. Use the **Cost Estimator** in the application (under `White‑Label → Cost Estimator`) to calculate monthly and yearly profit based on your chosen markup.

## 4. Sharing Your Branded Platform

Once configured, you can invite your clients to your custom domain. All emails and links will use your branding.

---

**Need more help?** Contact support@royaltyx.com and we will assist with advanced white‑label customization.
