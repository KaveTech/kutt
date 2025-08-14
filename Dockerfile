FROM node:12.22.12-alpine

RUN apk add --update bash

# Setting working directory.
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install --force

# Copying source files
COPY . .

# Give permission to run script
RUN chmod +x ./wait-for-it.sh

# Build files, for some reason the build expects some env vars, instead of placing as build args, we do a hack:
# Real variables are injected at runtime on the container.
# TODO: we should study a fix better than the above hack.
COPY env.sample .env
RUN npm run build
RUN rm .env

EXPOSE 3000

# Running the app
CMD [ "npm", "start" ]