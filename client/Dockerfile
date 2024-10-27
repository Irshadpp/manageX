# FROM node:alpine
# WORKDIR /app
# COPY package.json package-lock.json .
# RUN npm install
# COPY . .
# ARG BUILD_ENV=production
# ENV NODE_OPTIONS=--max-old-space-size=4096
# EXPOSE 4173
# CMD ["sh", "-c", "if [ \"$BUILD_ENV\" = 'development' ]; then npm run dev -- --host 0.0.0.0; else npm run preview -- --host 0.0.0.0 --port 4173; fi"]



FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . .
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--port", "4173"]
# CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]