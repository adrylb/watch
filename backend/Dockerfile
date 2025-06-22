FROM node:20

WORKDIR /app

COPY . .

RUN npm install
RUN npm rebuild esbuild || true

EXPOSE 3001

CMD ["npm", "run", "dev"]