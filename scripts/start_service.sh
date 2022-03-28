#!/bin/bash

# navigate into current working directory

cd /home/despliegues/front

# nvm install 12

# nvm use 12.22

# npm install -g @angular/cli > /dev/null

sudo apt install curl

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

source ~/.profile 

nvm install 12.20

ng build --prod

# rm -rf /var/www/html/*

# cp -rf ./dist/* /var/www/html
