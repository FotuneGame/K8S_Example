FROM node:alpine

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install

# Копирование файлов проекта
COPY . .
RUN npm run build

EXPOSE 3001

CMD [ "npm","run","relize" ]