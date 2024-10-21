FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json .
RUN npm install
COPY . .
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
