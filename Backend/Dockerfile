FROM node:16.17.0-alpine

# create app directory and use it as working directory
WORKDIR /cabaigne-server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
