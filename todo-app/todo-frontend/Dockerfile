# Test stage
FROM node:20 AS test

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run test

# Build stage
FROM node:20

WORKDIR /usr/src/app

COPY --from=test /usr/src/app .

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist"]