#!/bin/bash
# chmod 700 api-restart.sh

if [[ "$1" == "master" ]]; then
	npm install --prefix /srv/nodejs/senti/services/waterworks-redis-cache/production
	systemctl restart waterworks-redis-cache.service
	sleep 5
	logtext=$( systemctl status waterworks-redis-cache | sed -E ':a;N;$!ba;s/\r{0,1}\n/\\n/g;' | sed -e 's/\(  \)//g;' )
	# Senti Slack Workspace
	curl -X POST -H 'Content-type: application/json' --data '{
	"blocks": [
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Senti Template updated",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Branch:*\n'$1'"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Travis",
					"emoji": true
				},
				"value": "travis-link",
				"url": "http://travis-ci.com/github/senti-iot/waterworks-redis-cache",
				"action_id": "button-action"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "System Log:",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "```'"$logtext"'```"
			}
		},
		{
			"type": "divider"
		}
	]
}' $2
	echo
	exit 0
fi

if [[ "$1" == "dev" ]]; then
	npm install --prefix /srv/nodejs/senti/services/waterworks-redis-cache/development
	systemctl restart waterworks-redis-cache-dev.service
	logtext=$( systemctl status waterworks-redis-cache-dev| sed -E ':a;N;$!ba;s/\r{0,1}\n/\\n/g;' | sed -e 's/\(  \)//g;' )
	# Senti Slack Workspace
	curl -X POST -H 'Content-type: application/json' --data '{
	"blocks": [
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Senti Template updated",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Branch:*\n'$1'"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Travis",
					"emoji": true
				},
				"value": "travis-link",
				"url": "http://travis-ci.com/github/senti-iot/waterworks-redis-cache",
				"action_id": "button-action"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "System Log:",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "```'"$logtext"'```"
			}
		},
		{
			"type": "divider"
		}
	]
}' $2
	echo
	exit 0
fi

exit 0
