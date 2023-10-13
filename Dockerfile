FROM node:18.5.0-slim
#RUN apk add --update nodejs npm
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
