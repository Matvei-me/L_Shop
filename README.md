# L_Shop

Учебный проект (лаба): прототип интернет-магазина на `Express + TypeScript` с простым SPA на клиенте.

## Что в проекте

- регистрация/авторизация пользователя;
- каталог товаров с поиском, сортировкой и фильтрами;
- корзина (добавление, изменение количества, удаление);
- оформление доставки;
- хранение данных в JSON-файлах (без БД).

## Стек

- Backend: `Node.js`, `Express`, `TypeScript`, `cookie-parser`, `jsonwebtoken`, `bcrypt`
- Frontend: `TypeScript`, `Vite` (dev/build)
- Форматирование и линтинг: `Prettier`, `ESLint`

## Структура

- `backend/` — API и работа с JSON-данными
- `frontend-spa/` — исходники SPA (разработка/сборка)
- `frontend/` — собранная статика, которую раздает backend
- `backend/openapi.json` — описание API для Swagger UI

### Swagger

После запуска backend открой **http://localhost:3000/api-docs** — там все эндпоинты и схемы.

Про ветку `docs` и сдачу доки по лабе см. файл **[LAB_DOCS.md](LAB_DOCS.md)**.

## Переменные окружения

Файл: `backend/.env`

Пример (можно взять из `backend/.env.example`):

```env
PORT=3000
JWT_SECRET=your-secret-key
```

## Запуск локально

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

Сервер поднимется на `http://localhost:3000`.

### 2) Frontend (режим разработки)

```bash
cd frontend-spa
npm install
npm run dev
```

Dev-сервер поднимется на `http://localhost:5173` (через прокси ходит в `/api`).

### 3) Сборка фронта для раздачи backend

```bash
cd frontend-spa
npm run build
cp -r dist/* ../frontend/
```

После этого backend будет отдавать собранный фронт из папки `frontend/`.

## Скрипты

### Backend

- `npm run dev` — запуск в режиме разработки
- `npm run build` — сборка TypeScript в `dist`
- `npm run start` — запуск собранной версии
- `npm run lint` — eslint по `src`
- `npm run format` — prettier по `src`

### Frontend

- `npm run dev` — Vite dev server
- `npm run build` — проверка TS + production build
- `npm run preview` — локальный просмотр production build

## API (кратко)

Базовый URL: `http://localhost:3000`

### Auth

- `POST /api/auth/register`  
  body: `{ name, email, login, phone, password }`
- `POST /api/auth/login`  
  body: `{ email, password }`
- `POST /api/auth/logout`

После `register/login` ставится `HttpOnly` cookie `sessionToken` (время жизни 10 минут).

### Profile

- `GET /api/profile` — текущий пользователь (нужна авторизация по cookie)

### Products

- `GET /api/products`
- query-параметры:
  - `search` — поиск по `name/description`
  - `sort` — `price_asc` / `price_desc`
  - `category` — фильтр по категории
  - `available` — `true` / `false`

### Cart (только авторизованный пользователь)

- `GET /api/cart`
- `POST /api/cart/items` body: `{ productId, quantity }`
- `PATCH /api/cart/items/:productId` body: `{ quantity }`
- `DELETE /api/cart/items/:productId`

### Delivery (только авторизованный пользователь)

- `GET /api/delivery`
- `POST /api/delivery` body: `{ address, phone, email, payment }`

После успешного оформления доставки корзина очищается.

## Где лежат данные

Файлы в `backend/src/data/`:

- `users.json`
- `products.json`
- `carts.json`
- `orders.json`

## Data-атрибуты для проверки

Во фронте расставлены:

- `data-title` / `data-price` — карточка товара на главной
- `data-title="basket"` / `data-price="basket"` — товар в корзине
- `data-registration` — форма регистрации
- `data-delivery` — форма доставки

## Ограничения текущей версии

- данные хранятся в JSON;
- нет полноценной валидации схемы запросов;
- нет тестов.