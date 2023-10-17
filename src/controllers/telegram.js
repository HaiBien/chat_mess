const TelegramBot = require('node-telegram-bot-api');

// const botToken = ['5542480069:AAHpM5-gQTRCK6CmjcgPHxUUAar7evVM7t8', '6416678009:AAHD9osqmlYT0oPcLbkUAVKvvYi9896ka6o'];

const bot = new TelegramBot('6416678009:AAHD9osqmlYT0oPcLbkUAVKvvYi9896ka6o', { polling: true });
module.exports = bot;