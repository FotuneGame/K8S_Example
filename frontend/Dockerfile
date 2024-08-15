FROM node:alpine AS builder

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install

# Копирование файлов проекта
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 3000

CMD [ "nginx","-g","daemon off;" ]