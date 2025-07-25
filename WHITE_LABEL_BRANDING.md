# White-Label Branding Setup
See [documentation/DOCUMENTATION_OVERVIEW.md](documentation/DOCUMENTATION_OVERVIEW.md) for a full index of guides.


This guide explains how to brand RoyaltyX as your own platform and resell it to clients.

## 1. Customize the Frontend

1. Replace the logo files in `frontend/src/modules/common/assets/img/brand/` with your branding.
2. Update the `REACT_APP_URL` and `REACT_APP_API_URL` values in your `.env` file to match your custom domain.
3. Rebuild the Docker containers for the changes to take effect.

## 2. Custom Domain & Login Screen

Set up DNS records for your domain to point to your hosting provider. Configure the `nginx` container to respond to your domain by editing `nginx/nginx.conf`.

You can automate this step by running `scripts/update-domain.sh yourdomain.com`. The script rewrites server names in `nginx/default.conf` and updates `REACT_APP_URL` values in your `.env` file.


The login screen automatically uses the logo files from step 1. No code changes are required.

## 3. Customize Email Templates

1. Open **Admin → Email Templates** in your dashboard.
2. Edit the subject or HTML content directly in the form. Use placeholders such as `{{ user_name }}` or `{{ dashboard_url }}` for dynamic values.
3. Save changes to create a new template version. The active template will be used for all outgoing emails.

## 4. Resell Pricing

Wholesale pricing starts at **$25 per seat per month**. You are free to set your own resale price. Use the **Cost Estimator** in the application (under `White‑Label → Cost Estimator`) to calculate monthly and yearly profit based on your chosen markup.

## 5. Sharing Your Branded Platform

Once configured, you can invite your clients to your custom domain. All emails and links will use your branding.

---

**Need more help?** Contact support@royaltyx.com and we will assist with advanced white‑label customization.
