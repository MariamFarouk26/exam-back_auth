FROM node:18.18.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

CMD ["npm", "run", "start:dev"]

