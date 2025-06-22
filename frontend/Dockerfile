FROM node:20

WORKDIR /app

COPY . .

RUN npm install
RUN npm rebuild lightningcss || true

EXPOSE 3000

CMD ["npm", "run", "dev"]