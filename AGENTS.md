# RoyaltyX Contributor Guide

Welcome to the RoyaltyX repository. This project contains a Django backend and a React frontend for a subscription-based content and royalty management platform. This guide summarises the most important information for future contributors.

## Repository Layout

- `backend/` – Django project with all API apps and Celery tasks.
- `frontend/` – React application.
- `local.yml` – Docker Compose configuration for development.
- `production.yml` – Docker Compose configuration for production.
- `nginx/` – Nginx configuration files used in production.
- Documentation files such as `STRIPE_PAYMENT_INTEGRATION.md`, `SUBSCRIPTION_PLANS.md`, etc. describe key features and setup steps.

## Getting Started

1. **Create a `.env` file** based on `.env.example` and fill in your local configuration (database, Stripe keys, OAuth secrets, etc.).
2. **Start the development stack**:
   ```bash
   docker compose -f local.yml up --build
   ```
   The backend will be available on http://localhost:8000 and the frontend on http://localhost:3000.
3. Access the API documentation at http://localhost:8000/docs/.

## Linting and Code Style

- **Python**: The backend uses [Ruff](https://docs.astral.sh/ruff/) for linting and formatting. The configuration is in `backend/pyproject.toml` (line length 88, Python 3.8). Run:
  ```bash
  cd backend
  ruff --fix .
  ```
- **JavaScript/React**: Run ESLint and Prettier via npm:
  ```bash
  cd frontend
  npm run lint:fix
  npm run format
  ```

## Running Tests

Before opening a pull request, ensure all tests pass:

```bash
# Backend tests
docker-compose -f local.yml exec backend python manage.py test

# Frontend tests
docker-compose -f local.yml exec frontend npm test
```

## Contribution Workflow

1. Create a new feature branch from `main`.
2. Make your changes following the linting and testing steps above.
3. Update or add documentation when your changes introduce new functionality.
4. Use descriptive commit messages.
5. Open a pull request targeting the `main` branch.

## Deployment

- For a production build, copy `.env.example` to `.env.production`, set the appropriate values and run:
  ```bash
  docker compose -f production.yml up -d --build
  ```
- See the documentation files in the repository root for detailed Stripe setup and webhook configuration.

## Contact

If you have questions or run into issues, check the documentation files in the repository or open an issue on GitHub.

