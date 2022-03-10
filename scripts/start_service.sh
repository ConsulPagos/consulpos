#!/bin/bash

# give permission to the files inside /secure_docs directory

sudo chmod -R 777 /var/www/html

# navigate into current working directory

cd /var/www/html

# install node modules

npm install

npm install -g @angular/cli > /dev/null

ng build --prod

# start our node app in the background using pm2

# sudo pm2 start ‘npm start.’
