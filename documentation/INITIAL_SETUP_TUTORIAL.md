# Initial Setup Tutorial
See [Documentation Overview](DOCUMENTATION_OVERVIEW.md) for a list of all guides.


This guide walks you through setting up RoyaltyX for local development. A short video walkthrough is available at [YouTube](https://youtu.be/dQw4w9WgXcQ).

## 1. Clone the Repository
```bash
git clone https://github.com/TraeDungy/RoyaltyX.git
cd RoyaltyX
```

## 2. Configure Environment Variables
Copy the example file and update the values described in the README:
```bash
cp .env.example .env
# edit .env
```

## 3. Start the Services
Use Docker Compose to launch Postgres, Redis, the backend, frontend and Nginx:
```bash
docker compose -f local.yml up --build
```
Access the app at `http://localhost:3000`.

If you prefer not to use Docker, follow the manual steps in
[Running RoyaltyX Without Docker](NON_DOCKER_SETUP.md) to start each
service individually.

## 4. Create a Superuser and Run Migrations
```bash
docker compose -f local.yml exec backend python manage.py migrate
docker compose -f local.yml exec backend python manage.py createsuperuser
```

## 5. Configure Stripe Webhooks
Forward webhooks from Stripe to your local server using **ngrok** or the **Stripe CLI**:

### ngrok
```bash
ngrok http 8000
```
Copy the HTTPS URL and add it as a webhook endpoint in your Stripe dashboard:
`https://<your-ngrok>.ngrok.io/payments/stripe-webhook/`

### Stripe CLI
```bash
stripe listen --forward-to 127.0.0.1:8000/payments/stripe-webhook/
```

## 6. Connect Platform Integrations
- **Google OAuth**: create a project in the Google Developer Console and add your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
- **TikTok**: create an app at the TikTok developer portal and supply `TIKTOK_CLIENT_ID` and `TIKTOK_CLIENT_SECRET`.
- **Twitch**: register an app on the Twitch developer portal and fill in `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET`.

Each platform requires the corresponding redirect URI from your `.env` file.

---

You're now ready to explore RoyaltyX! The video tutorial demonstrates these steps in real time if you prefer a visual guide.
