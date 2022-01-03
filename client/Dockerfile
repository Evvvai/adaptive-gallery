# ---- Build ---- #
FROM node:16.13-alpine AS build
WORKDIR /client
COPY package.json yarn.lock ./
RUN npm config set registry https://registry.npmjs.com/
RUN yarn install --prod
COPY . ./
RUN yarn run build:craco

# ---- Release ---- #
FROM build
