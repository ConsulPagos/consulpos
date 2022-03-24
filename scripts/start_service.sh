#!/bin/bash

# navigate into current working directory

cd /home/despliegues/front

mkdir test_folder

npm install

npm install -g @angular/cli > /dev/null

ng build --prod

# rm -rf /var/www/html/*

# cp -rf ./dist/* /var/www/html

