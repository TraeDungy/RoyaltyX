#!/usr/bin/env bash
set -e
COMPOSE_FILE="local.yml"

echo "Starting frontend services..."
docker-compose -f $COMPOSE_FILE up -d frontend

echo "Running frontend tests..."
docker-compose -f $COMPOSE_FILE exec frontend npm test -- --watchAll=false

echo "Stopping frontend services..."
docker-compose -f $COMPOSE_FILE down
