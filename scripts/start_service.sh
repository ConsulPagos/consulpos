#!/bin/bash

# give permission to the files inside /secure_docs directory

sudo chmod -R 777 /home/desplieges/front

# navigate into current working directory

cd /home/desplieges/front

npm install

run: npm install -g @angular/cli > /dev/null

ng build --prod

cp -rf ./dist/* /var/www/html

