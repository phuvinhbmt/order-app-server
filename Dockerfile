# syntax=docker/dockerfile:1
FROM node:14

# create app directory
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . . 

CMD [ "node", "index.js"]
