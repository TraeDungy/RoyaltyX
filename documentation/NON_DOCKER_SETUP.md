# Running RoyaltyX Without Docker

This guide explains how to run the backend and frontend directly on your machine without Docker.
See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) for tips on linting and running tests.

## Prerequisites

- **Python 3.11+** and `pip`
- **Node.js 16+** and `npm`
- **PostgreSQL 14+**
- **Redis**

## 1. Clone the repository

```bash
git clone https://github.com/TraeDungy/RoyaltyX.git
cd RoyaltyX
```

## 2. Set up a local database

Create a PostgreSQL database and user. Update the database credentials in `.env` accordingly:

```bash
psql -U postgres -c "CREATE DATABASE royaltyx;"
psql -U postgres -c "CREATE USER royaltyx_user WITH PASSWORD 'password';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE royaltyx TO royaltyx_user;"
```

## 3. Configure environment variables

Copy the example file and fill in your credentials:

```bash
cp .env.example .env
# edit .env
```

Ensure `POSTGRES_HOST`, `POSTGRES_USER`, and related values match your local database.

## 4. Install backend dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt

# wkhtmltopdf is required for PDF generation via pdfkit.
# If it's missing, install the binary. On Debian/Ubuntu:
# sudo apt-get install wkhtmltopdf
```

## 5. Run migrations and start the backend

```bash
python manage.py migrate
python manage.py runserver
```

## 6. Install frontend dependencies

Open a new terminal, then run:

```bash
cd frontend
npm install
npm start
```

The React app will start on <http://localhost:3000> and proxy API requests to <http://localhost:8000>.

## 7. Running Celery workers

If you need background tasks, start a Celery worker after launching Redis:

```bash
redis-server &  # or use your OS service manager
cd backend && source venv/bin/activate
celery -A royaltyx worker -B --loglevel=info
```

You're now running RoyaltyX without Docker.


