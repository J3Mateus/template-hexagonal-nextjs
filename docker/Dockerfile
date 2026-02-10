FROM node:20.9.0-alpine  as dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 1000000

FROM node:18.19-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn run build

ENV NODE_ENV production

EXPOSE 3000

CMD ["yarn", "run", "start"]
