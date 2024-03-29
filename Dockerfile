FROM node:18-alpine
WORKDIR /usr/src/kittychan_api
COPY package.json .
RUN npm install -g typescript
RUN npm i

ARG KITTY_CHAN_TOKEN
ENV KITTY_CHAN_TOKEN $KITTY_CHAN_TOKEN

ARG DISCORD_CLIENT_ID
ENV DISCORD_CLIENT_ID $DISCORD_CLIENT_ID

ARG DISCORD_CLIENT_SECRET
ENV DISCORD_CLIENT_SECRET $DISCORD_CLIENT_SECRET

ARG DISCORD_CALLBACK_URL
ENV DISCORD_CALLBACK_URL $DISCORD_CALLBACK_URL

ARG JWT_SECRET
ENV JWT_SECRET $JWT_SECRET

ARG REDIS_HOST
ENV REDIS_HOST $REDIS_HOST

ARG REDIS_PASS
ENV REDIS_PASS $REDIS_PASS

ARG REDIS_DB
ENV REDIS_DB $REDIS_DB

ARG MONGO_URI
ENV MONGO_URI $MONGO_URI

ARG ES_HOST
ENV ES_HOST $ES_HOST

ARG KITTY_CHAN_GRPC_URL
ENV KITTY_CHAN_GRPC_URL $KITTY_CHAN_GRPC_URL

COPY . .
RUN npm run build
CMD ["node", "./dist/main.js"]
EXPOSE 3000