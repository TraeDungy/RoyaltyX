#!/usr/bin/env bash
set -e
COMPOSE_FILE="local.yml"

echo "Starting all services..."
docker-compose -f $COMPOSE_FILE up -d

# Wait for backend to be ready
for i in {1..30}; do
  if docker-compose -f $COMPOSE_FILE exec backend python manage.py showmigrations >/dev/null 2>&1; then
    echo "Backend is ready."
    break
  fi
  echo "Waiting for backend to be ready... ($i)"
  sleep 2
done

echo "Running backend tests..."
docker-compose -f $COMPOSE_FILE exec backend python manage.py test apps

echo "Running frontend tests..."
docker-compose -f $COMPOSE_FILE exec frontend npm test -- --watchAll=false

echo "Stopping all services..."
docker-compose -f $COMPOSE_FILE down
