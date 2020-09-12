FROM node:12.18.3-alpine3.10

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install --silent

COPY . /app

CMD ["npm", "start"]

