#!/usr/bin/env bash

cd /home/ubuntu/ccc/frontend/

echo "Build docker images......"
sudo docker build -t docker_frontend .

# Create Docker
echo "Run docker frontend......"
sudo docker run -it -d -p 80:3000 --name web-frontend docker_frontend:latest