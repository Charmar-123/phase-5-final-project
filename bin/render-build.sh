#!/usr/bin/env bash
# exit on error
# set -o errexit

# Add build commands for front end
rm -rf public
npm install --prefix client --force && npm run build --prefix client --force
cp -a client/build/. public/

# bundle install
# bundle exec rake db:migrate