FROM node:16 as build
RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get autoremove --purge -y
RUN npm install npm@latest -g
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build
FROM nginx:latest
RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get autoremove --purge -y
COPY --from=build /app/build /usr/share/nginx/html/data-unit-converter
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
