FROM node:lts

WORKDIR /app

COPY . /app

ENTRYPOINT [ "npm", "start" ]