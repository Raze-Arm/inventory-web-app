FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
ENV REACT_APP_HOST  mega-electric-app

COPY . .
RUN npm run build



FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html