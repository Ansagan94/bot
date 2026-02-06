require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN || '8574059700:AAGp7zDVEWgQ82WksSWlNEv6a1yLdh9cd_o';
const bot = new TelegramBot(token, { polling: true });

// Главное меню с кнопками
const mainMenu = {
  reply_markup: {
    keyboard: [
      ['🏠 По суточно', '🏢 По месячно'],
      ['🕐 Время заселения'],
      ['🔄 Обновить меню']
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// Приветствие при /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '👋 Добро пожаловать! Выберите действие из меню ниже:', mainMenu);
});

// Обработка кнопок меню
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Игнорируем команды
  if (text.startsWith('/')) return;

  switch (text) {
    case '🏠 По суточно':
      bot.sendMessage(chatId, '🏠 *Квартиры по суточно*\n\nАренда квартир на сутки.\n\nЗдесь можно добавить список квартир или форму для поиска.', { parse_mode: 'Markdown', ...mainMenu });
      break;

    case '🏢 По месячно':
      bot.sendMessage(chatId, '🏢 *Квартиры по месячно*\n\nАренда квартир на месяц.\n\nЗдесь можно добавить список квартир или форму для поиска.', { parse_mode: 'Markdown', ...mainMenu });
      break;

    case '🕐 Время заселения':
      const timePickerKeyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '◀️', callback_data: 'time_prev_14:00' },
              { text: '🕐 14:00', callback_data: 'time_display' },
              { text: '▶️', callback_data: 'time_next_14:00' }
            ],
            [
              { text: '✅ Выбрать это время', callback_data: 'time_select_14:00' }
            ]
          ]
        }
      };
      bot.sendMessage(chatId, '🕐 *Выберите время заселения:*\n\nИспользуйте ◀️ ▶️ для изменения времени', { parse_mode: 'Markdown', ...timePickerKeyboard });
      break;

    case '🔄 Обновить меню':
      bot.sendMessage(chatId, 'Меню обновлено!', mainMenu);
      break;

    default:
      bot.sendMessage(chatId, 'Используйте кнопки меню или команду /start', mainMenu);
  }
});

// Функция для изменения времени с шагом 15 минут
function adjustTime(timeStr, direction) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  let totalMinutes = hours * 60 + minutes;
  
  if (direction === 'next') {
    totalMinutes += 15;
    if (totalMinutes >= 24 * 60) totalMinutes = 8 * 60; // После 23:45 -> 08:00
  } else {
    totalMinutes -= 15;
    if (totalMinutes < 8 * 60) totalMinutes = 23 * 60 + 45; // До 08:00 -> 23:45
  }
  
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}

// Функция для получения эмодзи в зависимости от времени
function getTimeEmoji(timeStr) {
  const hour = parseInt(timeStr.split(':')[0]);
  if (hour >= 6 && hour < 9) return '🌅';
  if (hour >= 9 && hour < 12) return '☀️';
  if (hour >= 12 && hour < 15) return '🕐';
  if (hour >= 15 && hour < 18) return '🕓';
  if (hour >= 18 && hour < 20) return '🌆';
  if (hour >= 20 && hour < 22) return '🌃';
  return '🌙';
}

// Обработка выбора времени (inline кнопки)
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const data = query.data;

  if (data.startsWith('time_')) {
    if (data === 'time_display') {
      bot.answerCallbackQuery(query.id, { text: 'Используйте ◀️ ▶️ для изменения' });
      return;
    }

    if (data.startsWith('time_prev_') || data.startsWith('time_next_')) {
      const direction = data.startsWith('time_prev_') ? 'prev' : 'next';
      const currentTime = data.split('_')[2];
      const newTime = adjustTime(currentTime, direction);
      const emoji = getTimeEmoji(newTime);
      
      const updatedKeyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '◀️', callback_data: `time_prev_${newTime}` },
              { text: `${emoji} ${newTime}`, callback_data: 'time_display' },
              { text: '▶️', callback_data: `time_next_${newTime}` }
            ],
            [
              { text: '✅ Выбрать это время', callback_data: `time_select_${newTime}` }
            ]
          ]
        }
      };
      
      bot.answerCallbackQuery(query.id);
      bot.editMessageReplyMarkup(updatedKeyboard.reply_markup, {
        chat_id: chatId,
        message_id: messageId
      });
      return;
    }

    if (data.startsWith('time_select_')) {
      const selectedTime = data.replace('time_select_', '');
      bot.answerCallbackQuery(query.id, { text: `Выбрано: ${selectedTime}` });
      bot.sendMessage(chatId, `✅ Время заселения: *${selectedTime}*`, { parse_mode: 'Markdown', ...mainMenu });
      return;
    }
  }
});

console.log('🤖 Бот запущен и готов к работе!');
