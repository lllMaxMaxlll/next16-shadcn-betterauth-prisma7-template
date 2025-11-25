#!/bin/sh
set -e

# Wait for the database to be ready
echo "Waiting for database to be ready..."
until nc -z db 5432; do
  echo "Database is unavailable - sleeping"
  sleep 1
done
echo "Database is ready!"

# Run migrations
echo "Running migrations..."
npx prisma migrate deploy

# Run seed
if [ -f "prisma/seed.js" ]; then
  echo "Running seed..."
  node prisma/seed.js
fi

# Start the application
echo "Starting application..."
node server.js
