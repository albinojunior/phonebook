FROM node:8.11.2-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4200
CMD [ "npm", "start" ]