# RoyaltyX - Content & Royalty Management Platform

## 🎯 What is RoyaltyX?

RoyaltyX is a comprehensive content and royalty management platform designed to empower content creators, artists, and digital entrepreneurs. Our platform helps you track, manage, and optimize your revenue streams across multiple channels while providing powerful analytics and insights to grow your business.

### 🚀 Why RoyaltyX?

In today's digital economy, content creators face the challenge of managing revenue from multiple sources - streaming platforms, social media, licensing deals, and direct sales. RoyaltyX solves this by providing:

- **Centralized Revenue Tracking**: Monitor all your income streams in one place
- **Advanced Analytics**: Understand your performance with detailed insights and trends
- **Content Management**: Organize and track your digital assets efficiently
- **Subscription Management**: Flexible pricing plans that grow with your business
- **Multi-Platform Integration**: Connect with major platforms and services
- **Professional Reporting**: Generate detailed reports for tax purposes and business planning
- **White-Label Branding**: Offer the platform under your own domain and logo

### 🎨 Perfect For:

- **Musicians & Artists**: Track streaming royalties, licensing fees, and merchandise sales
- **Content Creators**: Monitor YouTube, TikTok, Vimeo, and social media revenue
- **Digital Entrepreneurs**: Manage multiple revenue streams and business metrics
- **Small Agencies**: Handle client content and revenue tracking
- **Freelancers**: Track project income and business performance

---

## 🏗️ Technical Architecture

RoyaltyX is built with modern, scalable technologies:

### Backend
- **Django 5.0.6** - Robust Python web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Reliable database system
- **Redis** - Caching and session management
- **Celery** - Background task processing
- **Stripe Integration** - Secure payment processing

### Celery Beat Tasks

The backend uses **django-celery-beat** to schedule synchronization jobs. When
the application starts, `SourcesConfig.ready` creates daily tasks to pull data
from third-party platforms:

- **Fetch Youtube Videos** – runs `task_fetch_youtube_videos`
- **Fetch YouTube Stats** – runs `task_fetch_youtube_stats`
- **Fetch TikTok Videos** – runs `task_fetch_tiktok_videos`
- **Fetch TikTok Stats** – runs `task_fetch_tiktok_stats`

### Frontend
- **React 18** - Modern JavaScript framework
- **Material-UI** - Professional component library
- **React Router** - Client-side routing
- **Context API** - State management

### Infrastructure
- **Docker** - Containerized deployment
- **Nginx** - Web server and reverse proxy
- **SSL/HTTPS** - Secure communications
- **RESTful APIs** - Clean, documented endpoints

---

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Git
- Node.js 16+ (for local development)
- Python 3.11+ (for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NENAD-BLAGOVCANIN/RoyaltyX.git
   cd RoyaltyX
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the application**
   ```bash
   # Development environment
   docker-compose -f local.yml up --build
   
   # Production environment
   docker-compose -f production.yml up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs/

### Initial Setup

1. **Create a superuser**
   ```bash
   docker-compose -f local.yml exec backend python manage.py createsuperuser
   ```

2. **Run database migrations**
   ```bash
   docker-compose -f local.yml exec backend python manage.py migrate
   ```

3. **Load initial data (optional)**
   ```bash
   docker-compose -f local.yml exec backend python manage.py loaddata initial_data.json
   ```

### Using the Help Tab

After signing in, open **Help Documentation** from the admin sidebar. Each setup step
is presented as a collapsible help card. Click a card title to expand or collapse
the instructions. The smooth animation keeps guidance available without getting in
your way.

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Database Configuration
POSTGRES_HOST=postgres
POSTGRES_DB=royaltyx
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_PORT=5432

# Development Server
WDS_SOCKET_HOST=127.0.0.1
CHOKIDAR_USEPOLLING=true
WATCHPACK_POLLING=true

# Frontend Configuration
REACT_APP_API_URL=http://localhost:8000
REACT_APP_URL=http://localhost:3000
REACT_APP_GOOGLE_CLIENT_ID=
REACT_APP_TIKTOK_CLIENT_ID=
REACT_APP_TWITCH_CLIENT_ID=

# OAuth Configuration (Optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/google-oauth-callback
TIKTOK_CLIENT_ID=
TIKTOK_CLIENT_SECRET=
TIKTOK_REDIRECT_URI=https://<ngrok-url>/tiktok-oauth-callback
TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=
TWITCH_REDIRECT_URI=https://<ngrok-url>/twitch-oauth-callback
VIMEO_CLIENT_ID=
VIMEO_CLIENT_SECRET=
VIMEO_REDIRECT_URI=http://localhost:3000/vimeo-oauth-callback

# Redis Configuration
CELERY_BROKER_URL=redis://redis:6379/0

# Django
DJANGO_SECRET_KEY=your_secret_key_here

# Stripe Payment Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_BASIC_PRICE_ID=price_...
STRIPE_PREMIUM_PRICE_ID=price_...

# OpenAI Configuration
# Set this using a secure secret from your Codex settings
OPENAI_API_KEY=

# Email Configuration
EMAIL_HOST=smtp.zoho.eu
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_USE_SSL=False
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=your-email@gmail.com
SERVER_EMAIL=your-email@gmail.com
```

Below is a quick reference explaining what each variable controls:

| Variable | Purpose |
|----------|---------|
| `POSTGRES_HOST` | Database server hostname |
| `POSTGRES_DB` | PostgreSQL database name |
| `POSTGRES_USER` | PostgreSQL user |
| `POSTGRES_PASSWORD` | PostgreSQL password |
| `POSTGRES_PORT` | PostgreSQL port |
| `WDS_SOCKET_HOST` | Hostname for the Webpack dev server socket |
| `CHOKIDAR_USEPOLLING` | Enable polling for file watching in Docker |
| `WATCHPACK_POLLING` | Additional polling for hot reload |
| `REACT_APP_API_URL` | Base URL of the backend API |
| `REACT_APP_URL` | Public URL of the frontend |
| `REACT_APP_GOOGLE_CLIENT_ID` | Google OAuth client ID for frontend |
| `REACT_APP_TIKTOK_CLIENT_ID` | TikTok OAuth client ID for frontend |
| `REACT_APP_TWITCH_CLIENT_ID` | Twitch OAuth client ID for frontend |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID used by the backend |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_REDIRECT_URI` | Redirect URL for Google OAuth |
| `TIKTOK_CLIENT_ID` | TikTok OAuth client ID |
| `TIKTOK_CLIENT_SECRET` | TikTok OAuth client secret |
| `TIKTOK_REDIRECT_URI` | Redirect URL for TikTok OAuth |
| `TWITCH_CLIENT_ID` | Twitch OAuth client ID |
| `TWITCH_CLIENT_SECRET` | Twitch OAuth client secret |
| `TWITCH_REDIRECT_URI` | Redirect URL for Twitch OAuth |
| `VIMEO_CLIENT_ID` | Vimeo OAuth client ID |
| `VIMEO_CLIENT_SECRET` | Vimeo OAuth client secret |
| `VIMEO_REDIRECT_URI` | Redirect URL for Vimeo OAuth |
| `CELERY_BROKER_URL` | Redis URL for Celery tasks |
| `DJANGO_SECRET_KEY` | Secret key for Django |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable API key |
| `STRIPE_SECRET_KEY` | Stripe secret API key |
| `STRIPE_WEBHOOK_SECRET` | Secret used to verify Stripe webhooks |
| `STRIPE_BASIC_PRICE_ID` | Stripe price ID for the Basic plan |
| `STRIPE_PREMIUM_PRICE_ID` | Stripe price ID for the Premium plan |
| `OPENAI_API_KEY` | API key for OpenAI integration |
| `EMAIL_HOST` | SMTP server hostname |
| `EMAIL_PORT` | SMTP server port |
| `EMAIL_USE_TLS` | Enable TLS for email |
| `EMAIL_USE_SSL` | Enable SSL for email |
| `EMAIL_HOST_USER` | SMTP authentication username |
| `EMAIL_HOST_PASSWORD` | SMTP authentication password |
| `DEFAULT_FROM_EMAIL` | Default sender address |
| `SERVER_EMAIL` | Address used for server errors |

### Stripe Setup (For Payments)

1. Create a Stripe account at https://stripe.com
2. Create products for Basic ($19.99/month) and Premium ($49.99/month) plans
3. Copy the price IDs to your environment variables
4. Set up webhook endpoint: `https://yourdomain.com/payments/stripe-webhook/`
5. Subscribe to these webhook events:
   - `checkout.session.completed`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`

---

## 📊 Features

### 🔐 Authentication & User Management
- Secure user registration and login
- JWT-based authentication
- OAuth integration (Google, TikTok, Twitch, Vimeo)
- User profile management
- Role-based access control

### 💳 Subscription Management
- **Free Plan**: Basic features for getting started
- **Basic Plan** ($19.99/month): Advanced features for growing creators
- **Premium Plan** ($49.99/month): Full feature set for professionals
- Stripe-powered payment processing
- Automatic billing and subscription management
- Prorated plan changes and add-on billing
- Grace period handling for failed payments

### 📈 Analytics & Reporting
- Revenue tracking and analytics
- Performance metrics and trends
- Custom report generation
- Data export capabilities
- Real-time dashboard updates
- **Stored data**: individual product sales and impression records
- **Calculated on demand**: totals, time-series metrics and per-source analytics
- More details: [Analytics Data Overview](documentation/ANALYTICS_OVERVIEW.md)

### 🎵 Content Management
- Digital asset organization
- Content upload and management
- Search and filtering capabilities
- Metadata management
- Version control

### 🔗 Platform Integrations
- Multi-platform revenue tracking
- API integrations with major services
- Data synchronization
- Automated reporting

### 📱 User Experience
- Responsive design for all devices
- Intuitive dashboard interface
- Real-time notifications
- Dark/light theme support
- Comprehensive settings management
- **AI-Powered Help Chat**: Get instant answers from the documentation using OpenAI

### 🤝 White-Label Branding
- Rebrand RoyaltyX with your logo and domain
- Built-in cost estimator for resale pricing
- Simple setup—see [WHITE_LABEL_BRANDING.md](WHITE_LABEL_BRANDING.md)

---

## 🛠️ Development

### Local Development Setup

1. **Backend Development**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py runserver
   ```

2. **Frontend Development**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Running Tests

```bash
# Backend tests
docker-compose -f local.yml exec backend python manage.py test

# Frontend tests
docker-compose -f local.yml exec frontend npm test

# To run frontend tests without Docker:
cd frontend && npm test -- --watchAll=false
```

The backend relies on **PostgreSQL**. If you run tests outside the
Docker environment, make sure a PostgreSQL instance is available and
that your `.env` configuration points to it. When using Docker Compose
(recommended), ensure the `postgres` service is running before executing
the test commands, e.g.:

```bash
docker-compose -f local.yml up -d postgres
```

### Local Testing Environment Setup

1. Copy the test environment variables and start services:
   ```bash
   cp .env.test .env
   docker compose -f local.yml up -d
   ```
2. Run database migrations in the backend container:
   ```bash
   docker compose -f local.yml exec backend python manage.py migrate
   ```
3. Execute the test suite:
   ```bash
   docker compose -f local.yml exec backend python manage.py test
   docker compose -f local.yml exec frontend npm test
   ```

### API Documentation

- **Swagger UI**: http://localhost:8000/docs/
- **API Schema**: http://localhost:8000/schema/

---

## 📁 Project Structure

```
RoyaltyX/
├── backend/                 # Django backend
│   ├── apps/               # Django applications
│   │   ├── authentication/ # User authentication
│   │   ├── user/           # User management
│   │   ├── payments/       # Stripe payment integration
│   │   ├── analytics/      # Analytics and reporting
│   │   ├── sources/        # Revenue source management
│   │   └── ...
│   ├── royaltyx/           # Django project settings
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── modules/        # Feature modules
│   │   ├── components/     # Reusable components
│   │   └── ...
│   └── package.json        # Node.js dependencies
├── nginx/                  # Nginx configuration
├── local.yml               # Docker Compose (development)
├── production.yml          # Docker Compose (production)
```

---

## 🚀 Deployment

### Production Deployment

1. **Set up production environment**
   ```bash
   cp .env.example .env.production
   # Configure production settings
   ```

2. **Deploy with Docker**
   ```bash
   docker-compose -f production.yml up -d --build
   ```

3. **Set up SSL certificate**
   ```bash
   # Using Let's Encrypt
   docker-compose -f production.yml exec nginx certbot --nginx
   ```

4. **Enable Celery beat tasks**
   The `celery-beat` service must run to schedule background jobs. This includes
   a daily task that downgrades users with overdue payments to the free plan.

### Environment-Specific Configurations

- **Development**: `local.yml` - Hot reloading, debug mode
- **Production**: `production.yml` - Optimized builds, SSL, caching

---

## 🤝 Contributing

We welcome contributions to RoyaltyX! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint and Prettier for JavaScript code
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Documentation**: Check our comprehensive docs
- **AI Help Chat**: Use the built-in chat at `/admin/documentation/chat` for quick tips
- **Issues**: Report bugs on GitHub Issues
- **Email**: support@royaltyx.com
- **Community**: Join our Discord server

---

## 🙏 Acknowledgments

- Built with Django and React
- Payment processing by Stripe
- UI components by Material-UI
- Containerization with Docker
- Analytics powered by custom algorithms

---

**Ready to take control of your content revenue? Get started with RoyaltyX today!** 🚀
