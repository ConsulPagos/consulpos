#!/bin/bash

# give permission to the files inside /secure_docs directory

sudo chmod -R 777 /home/despliegues/front

# navigate into current working directory

cd /home/despliegues/front

npm install

run: npm install -g @angular/cli > /dev/null

ng build --prod

rm -rf /var/www/html/*

cp -rf ./dist/* /var/www/html

