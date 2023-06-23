FROM node:16-alpine
WORKDIR /usr/src/kittychan_api
COPY package.json .
RUN npm install -g typescript
RUN npm i
COPY . .
RUN npm run build
CMD ["node", "./dist/main.js"]
EXPOSE 3000