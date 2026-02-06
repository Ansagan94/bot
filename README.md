# Telegram Bot - Аренда Квартир

Telegram-бот для аренды квартир с интерактивным выбором времени заселения.

## Деплой на Render

### Шаг 1: Подготовка репозитория

1. Инициализируйте git (если еще не сделали):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Создайте репозиторий на GitHub и загрузите код:
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

### Шаг 2: Создание Web Service на Render

1. Перейдите на [render.com](https://render.com) и войдите
2. Нажмите **"New +"** → **"Web Service"**
3. Подключите ваш GitHub репозиторий
4. Настройте параметры:
   - **Name**: `telegram-bot-kvartir` (или любое имя)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### Шаг 3: Настройка переменных окружения

В разделе **Environment Variables** добавьте:
- **Key**: `BOT_TOKEN`
- **Value**: `8574059700:AAGp7zDVEWgQ82WksSWlNEv6a1yLdh9cd_o`

### Шаг 4: Деплой

Нажмите **"Create Web Service"** — Render автоматически задеплоит ваш бот.

## Локальный запуск

```bash
npm install
npm start
```

## Ссылка на бота

https://t.me/Kvart01_bot
