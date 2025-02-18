FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install @ir-managex/common@latest
RUN npm install 
COPY . .
CMD ["npm", "start"]