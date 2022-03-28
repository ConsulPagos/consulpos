#!/bin/bash

# navigate into current working directory

cd /home/despliegues/front

# nvm install 12.20

npm install -g node@12.20

npm install -g @angular/cli > /dev/null

ng build --prod

# rm -rf /var/www/html/*

# cp -rf ./dist/* /var/www/html

