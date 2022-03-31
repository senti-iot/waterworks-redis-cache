#!/bin/bash

if [[ "$1" == "master" ]]; then
	echo
	echo Deploying waterworks-redis-cache $1 ...
	rsync -r --quiet $2/ deploy@rey.webhouse.net:/srv/nodejs/senti/services/waterworks-redis-cache/production
	echo
	echo Restarting waterworks-redis-cache service: $1 ...
	ssh deploy@rey.webhouse.net "sudo /srv/nodejs/senti/services/waterworks-redis-cache/production/scripts/service-restart.sh master $3"
	echo
	echo Deployment to waterworks-redis-cache $1 and restart done!
	exit 0
fi

if [[ "$1" == "dev" ]]; then
	echo
	echo Deploying waterworks-redis-cache $1 ...
	rsync -r --quiet $2/ deploy@rey.webhouse.net:/srv/nodejs/senti/services/waterworks-redis-cache/development
	echo
	echo Restarting waterworks-redis-cache service: $1 ...
	ssh deploy@rey.webhouse.net "sudo /srv/nodejs/senti/services/waterworks-redis-cache/development/scripts/service-restart.sh dev $3"
	echo
	echo Deployment to waterworks-redis-cache $1 and restart done!
	exit 0
fi