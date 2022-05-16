#!/usr/bin/env bash

cd /home/ubuntu/ccc/backend/

echo "Build docker images......"
sudo docker build -t docker_backend .

# Create Docker
echo "Run docker backend......"
sudo docker run -it -d -p 8080:8080 --name web-backend docker_backend:latest