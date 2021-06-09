FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
#ARG BACKEND_API
#ENV REACT_APP_BACKEND_API  ${BACKEND_API}

COPY . .
RUN npm run build



FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html