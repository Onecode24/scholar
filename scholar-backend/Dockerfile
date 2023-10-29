FROM node:16

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn

COPY . .

CMD ["npx","prisma","migrate","deploy"]

RUN yarn build

CMD ["node","dist/main.js"]