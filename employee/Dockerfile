FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install 
COPY . .
CMD ["npm", "start"]