FROM node:16.13

WORKDIR /app

COPY package.json /app/package.json
ADD yarn.lock /app/
RUN yarn install
