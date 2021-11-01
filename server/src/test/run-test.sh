#!/bin/bash

# Start PostgreSQL database for test
docker-compose -f docker-compose-test.yml up -d

# Ping for readiness
RETRIES=5
until psql "postgres://upskill_user:upskill_pw@localhost:5434/upskill_db" -c "select 1" > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
  echo "Waiting for postgres server, $((RETRIES--)) remaining attempts..."
  sleep 1
done

# Execute test suite
if [ $RETRIES -gt 0 ]
then
    echo "Running all tests..."
    NODE_ENV=TEST ../../node_modules/mocha/bin/mocha '../test/**/*_test.js' --timeout 10000 --exit
else
    echo "Failed to connect to test database."
fi

# Clean up
docker-compose -f docker-compose-test.yml down -v