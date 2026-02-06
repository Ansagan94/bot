# 🖥️ Деплой бота на VPS

## Требования к VPS
- Ubuntu 20.04+ / Debian 11+
- Минимум 512MB RAM
- Node.js 16+

## 1. Подключитесь к VPS

```bash
ssh root@ВАШ_IP_АДРЕС
# или
ssh username@ВАШ_IP_АДРЕС
```

## 2. Установите Node.js и npm

```bash
# Обновите систему
sudo apt update && sudo apt upgrade -y

# Установите Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Проверьте установку
node --version
npm --version
```

## 3. Установите PM2 (менеджер процессов)

```bash
sudo npm install -g pm2
```

## 4. Клонируйте репозиторий

```bash
# Перейдите в домашнюю директорию
cd ~

# Клонируйте репозиторий
git clone https://github.com/Ansagan94/bot.git
cd bot
```

## 5. Установите зависимости

```bash
npm install
```

## 6. Настройте переменные окружения

```bash
# Создайте файл .env
nano .env
```

Добавьте в файл:
```
BOT_TOKEN=8574059700:AAGp7zDVEWgQ82WksSWlNEv6a1yLdh9cd_o
```

Сохраните: `Ctrl + O`, затем `Enter`, выйдите: `Ctrl + X`

## 7. Запустите бота с PM2

```bash
# Запустите бота
pm2 start index.js --name telegram-bot

# Или используйте ecosystem.config.js
pm2 start ecosystem.config.js

# Сохраните конфигурацию PM2
pm2 save

# Настройте автозапуск при перезагрузке сервера
pm2 startup
# Выполните команду, которую покажет PM2
```

## 8. Полезные команды PM2

```bash
# Проверить статус бота
pm2 status

# Посмотреть логи
pm2 logs telegram-bot

# Остановить бота
pm2 stop telegram-bot

# Перезапустить бота
pm2 restart telegram-bot

# Удалить бота из PM2
pm2 delete telegram-bot

# Мониторинг в реальном времени
pm2 monit
```

## 9. Обновление бота

```bash
cd ~/bot
git pull origin main
npm install
pm2 restart telegram-bot
```

## 10. Настройка Firewall (опционально)

```bash
# Установите UFW
sudo apt install ufw

# Разрешите SSH
sudo ufw allow ssh

# Включите firewall
sudo ufw enable

# Проверьте статус
sudo ufw status
```

## ✅ Готово!

Ваш бот теперь работает 24/7 на VPS!

Проверьте: https://t.me/Kvart01_bot

---

## Проблемы?

### Бот не отвечает
```bash
pm2 logs telegram-bot
```

### Порт занят
```bash
pm2 delete all
pm2 start ecosystem.config.js
```

### Обновить Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```
