FROM node:10 AS builder
WORKDIR /app
COPY . .
RUN yarn install --ignore-engines && yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
