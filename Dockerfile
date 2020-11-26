### STAGE 1: Build ###
FROM node:alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build --prod
RUN npm install -g @angular/cli
CMD ["ng", "serve", "--proxy-config", "proxy.config.json"]
