#!/bin/bash

# navigate into current working directory

cd /home/despliegues/Sistema_Administrativo/front

# npm install

# npm install -g @angular/cli > /dev/null

ng build --prod

rm -rf /var/www/html/*

cp -rf ./dist/* /var/www/html

