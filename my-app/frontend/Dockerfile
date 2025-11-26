# Build stage
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
COPY vite.config.js ./
COPY public ./public
COPY src ./src
COPY index.html ./

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm ci

RUN npm run build

RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "dist"]