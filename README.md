# Проект Fit-friends

Проект для профессии Fullstack - разработчик


## Запуск проекта
Запуск внешних сервисов осуществляется через Docker, в директории  `backend` есть файл `docker-compose.dev.yml`  
_Также перед запуском необходимо установить все зависимости из директорий **backend** и **frontend**._

### 1. Генерация тестовых данных для базы данных:
Для взаимодействия с PostgreSQL используется PrismaORM.

В директории `backend`  

Для миграции и генерации клиента призмы: 
```
npm run db:prepare
```

Для наполнения начальными тестовыми данными:
```
npm run db:seed
```

### 2. Запуск сервера:

В директории `backend` выполнить команду   
```
npm run start:dev
```

### 3. Запуск фронтенда:

В директории `frontend` выполнить команду
 
```
npm run start
```

**Переменные окружения** (для примера файл .env-example в директории `backend` и `backend/prisma`)   
  
  
  
`POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, PGADMIN_DEFAULT_EMAIL, PGADMIN_DEFAULT_PASSWORD, DATABASE_URL` — настройки для подключения к PostgreSQL  

`JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRES_IN, JWT_REFRESH_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRES_IN` — настройки для Access и Refresh Tokens 

**Спецификация API** будет доступна по ссылке `http://localhost:3000/spec`