FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ADD . .

CMD [ "npm", "run", "dev" ]
