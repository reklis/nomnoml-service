FROM node:lts

WORKDIR /app

COPY package.json /app/
RUN npm i

COPY bin /app/bin
COPY public /app/public
COPY routes /app/routes
COPY views /app/views
COPY app.js /app/

ENTRYPOINT [ "npm", "start" ]