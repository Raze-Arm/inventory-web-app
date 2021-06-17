FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm cache clean --force
RUN  npm install --registry=https://registry.npmjs.org

ARG BACKEND_API
ARG WEBSOCKET_API
ENV REACT_APP_BACKEND_API  ${BACKEND_API}
ENV REACT_APP_WEBSOCKET_API ${WEBSOCKET_API}

COPY . .
RUN npm run build



FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html