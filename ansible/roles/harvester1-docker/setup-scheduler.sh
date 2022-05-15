#!/usr/bin/env bash

#Change permission
sudo chmod 777 /etc/cron.d/cron_harvest

#Retrigger crontab
crontab /etc/cron.d/cron_harvest