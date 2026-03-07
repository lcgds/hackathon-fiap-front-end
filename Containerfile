FROM node:lts

ENV NODE_ENV=development
WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev" ]
