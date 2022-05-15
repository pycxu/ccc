#!/usr/bin/env bash

cd sentiment

echo "Build docker images......"
sudo docker build -t twitter_sentiment .

# Create Docker
echo "Run docker twitter_senti......"
sudo docker run -d --name twitter_senti twitter_sentiment

