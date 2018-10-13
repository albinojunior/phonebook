FROM node:alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
RUN npm i -g pm2
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]