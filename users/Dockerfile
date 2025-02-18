FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install @ir-managex/common@latest --force
RUN npm install
COPY . .
CMD ["npm", "start"]