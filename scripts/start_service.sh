#!/bin/bash

# navigate into current working directory

cd /home/despliegues/front

sudo apt-get --assume-yes install npm

npm install -g node@12.20

npm install -g @angular/cli > /dev/null

ng build --prod

# rm -rf /var/www/html/*

# cp -rf ./dist/* /var/www/html

