# Telegram Bot - Аренда Квартир

Telegram-бот для аренды квартир с интерактивным выбором времени заселения.

## Деплой на Railway

### Шаг 1: Подготовка репозитория

1. Создайте репозиторий на GitHub и загрузите код:
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

### Шаг 2: Деплой на Railway

1. Перейдите на [railway.app](https://railway.app) 
2. Войдите через GitHub
3. Нажмите **"New Project"** → **"Deploy from GitHub repo"**
4. Выберите ваш репозиторий
5. Railway автоматически определит Node.js приложение

### Шаг 3: Настройка переменных окружения

1. Откройте ваш проект на Railway
2. Перейдите во вкладку **"Variables"**
3. Добавьте переменную:
   - **Variable**: `BOT_TOKEN`
   - **Value**: `8574059700:AAGp7zDVEWgQ82WksSWlNEv6a1yLdh9cd_o`
4. Нажмите **"Add"**

### Шаг 4: Готово!

Railway автоматически задеплоит бота. Через 1-2 минуты бот будет работать 24/7.

**Преимущества Railway:**
- ✅ Автоматический деплой при push в GitHub
- ✅ Бесплатно $5 кредитов в месяц
- ✅ Простая настройка

## Локальный запуск

```bash
npm install
npm start
```

## Ссылка на бота

https://t.me/Kvart01_bot
