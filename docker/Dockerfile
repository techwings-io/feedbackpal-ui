### STAGE 1: Build ###
FROM node:14.1-alpine AS compile-image

WORKDIR /opt/web
COPY package.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN ng build --prod

FROM nginx:1.17-alpine
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/web/dist/feedbackpal-ui-gen /usr/share/nginx/html