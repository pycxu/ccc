#!/bin/sh
./create_instance.sh
./setup_env
./setup_couchdb
./harvester_sentiment
./add_design_view.sh
./aurin.sh