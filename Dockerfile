# ---- Build ---- #
FROM node:16.13 AS build
COPY package.json yarn.lock ./
RUN yarn install --prod
COPY . ./
RUN yarn run build:craco

# ---- Release Nginx ---- #
FROM nginx:1.21.5-alpine

COPY --from=build build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
