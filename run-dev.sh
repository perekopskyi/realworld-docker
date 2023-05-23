# Run docker-compose.yml with rewriting fields by docker-compose.development.yml
# Add `-d`` for starting in background
docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build