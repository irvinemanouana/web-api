#!/bin/bash

PARENT=..
CURRENT_DIRNAME="`dirname \"$0\"`"
FILE_LOCATION="`( cd \"$CURRENT_DIRNAME\" && pwd )`"
ROOT_FOLDER=$FILE_LOCATION/$PARENT

mongoimport -d ManageEventESGI -c oauthclients --type json --file $ROOT_FOLDER/fixtures/clients.json --jsonArray