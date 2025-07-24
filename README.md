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

For a visual overview of these components see
[Architecture Overview](documentation/ARCHITECTURE_OVERVIEW.md).

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
   git clone https://github.com/TraeDungy/RoyaltyX.git
   cd RoyaltyX
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```
   
   See the [Initial Setup Tutorial](documentation/INITIAL_SETUP_TUTORIAL.md)
   for a complete walkthrough and video guide.

3. **Start the application**
   ```bash
   # Development environment
   docker-compose -f local.yml up --build

   # Production environment
   docker-compose -f production.yml up --build
   ```
   If you want to run the services directly on your machine without Docker,
   follow the steps in
   [Running RoyaltyX Without Docker](documentation/NON_DOCKER_SETUP.md).

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

### Loading Initial Data

RoyaltyX ships with a fixture file, `initial_data.json`, which contains a demo
user and example records. Loading this data is helpful when exploring the
platform locally. Run the following command from the repository root:

```bash
docker-compose -f local.yml exec backend python manage.py loaddata initial_data.json
```

If you prefer, a custom management command `seed_demo_data` provides the same
functionality and can be extended for larger datasets:

```bash
docker-compose -f local.yml exec backend python manage.py seed_demo_data
```

### Using the Help Tab

After signing in, open **Help Documentation** from the admin sidebar. Each setup step
is presented as a collapsible help card. Click a card title to expand or collapse
the instructions. The smooth animation keeps guidance available without getting in
your way.

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example` and fill in the following
variables:

```bash
# Database
POSTGRES_HOST=postgres
POSTGRES_DB=royaltyx
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_PORT=5432

# Django
DJANGO_SECRET_KEY=your_secret_key_here
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=*

# Development Server
WDS_SOCKET_HOST=127.0.0.1
CHOKIDAR_USEPOLLING=true
WATCHPACK_POLLING=true

# Frontend URLs
REACT_APP_API_URL=http://localhost:8000
REACT_APP_URL=http://localhost:3000

# Frontend OAuth IDs
REACT_APP_GOOGLE_CLIENT_ID=
REACT_APP_TIKTOK_CLIENT_ID=
REACT_APP_TWITCH_CLIENT_ID=

# Backend OAuth Credentials
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/google-oauth-callback
TIKTOK_CLIENT_ID=
TIKTOK_CLIENT_SECRET=
TIKTOK_REDIRECT_URI=https://<ngrok-url>/tiktok-oauth-callback
TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=
TWITCH_REDIRECT_URI=https://<ngrok-url>/twitch-oauth-callback

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_BASIC_PRICE_ID=price_...
STRIPE_PREMIUM_PRICE_ID=price_...

# Email (for notifications)
EMAIL_HOST=smtp.zoho.eu
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_USE_SSL=False
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=your-email@gmail.com
SERVER_EMAIL=your-email@gmail.com

# Other services
OPENAI_API_KEY=
CELERY_BROKER_URL=redis://redis:6379/0
LOG_LEVEL=INFO
```

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
6. Retrieve available add-ons via `GET /payments/add-ons/`

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
- Billing history page and payment method management

### 📈 Analytics & Reporting
- Revenue tracking and analytics
- Performance metrics and trends
- Custom report generation
- Extensive PDF template customization (see [PDF Template Customizer](documentation/PDF_TEMPLATE_CUSTOMIZER.md))
- Data export capabilities
- Real-time dashboard updates
- Saved dashboard preferences (card order & colors)
- **Stored data**: individual product sales and impression records
- **Calculated on demand**: totals, time-series metrics and per-source analytics
- More details: [Analytics Data Overview](documentation/ANALYTICS_OVERVIEW.md)
- Fee setup guide: [Fee System Overview](documentation/FEE_SYSTEM.md)

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

The steps below describe how to work on RoyaltyX without Docker. See
[Running RoyaltyX Without Docker](documentation/NON_DOCKER_SETUP.md) for a
more thorough walkthrough.

1. **Backend Development**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   # WeasyPrint relies on cairo and other system packages
   # If you see "ModuleNotFoundError: weasyprint" install its dependencies:
   # sudo apt-get install libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libcairo2
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
- More endpoints: [API Overview](documentation/API_OVERVIEW.md)

---

## 📁 Project Structure

For a high level walkthrough of the repository layout see
[CODEBASE_OVERVIEW.md](CODEBASE_OVERVIEW.md).

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
- Keep a trailing newline at the end of every file
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting
- See [AGENTS.md](AGENTS.md) for detailed contributor instructions
- Additional tips can be found in [documentation/DEVELOPER_GUIDE.md](documentation/DEVELOPER_GUIDE.md)

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
