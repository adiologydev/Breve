FROM node:16-alpine3.15

ENV PORT 3000

RUN mkdir -p /breve/src/app
WORKDIR /breve/src/app

COPY package*.json /breve/src/app/
RUN npm install

COPY . /breve/src/app

RUN npm run build
EXPOSE 3000

CMD "npm" "run" "dev"