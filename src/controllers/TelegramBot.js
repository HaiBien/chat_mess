const TelegramBot = require('node-telegram-bot-api');

// Danh sách các mã token của 10 bot
const botTokens = [
  '5542480069:AAHpM5-gQTRCK6CmjcgPHxUUAar7evVM7t8',
  '6416678009:AAHD9osqmlYT0oPcLbkUAVKvvYi9896ka6o',
  "6424840137:AAEkUtAf86nVPrseHCuWwYJ2y4C7FIAQUQI"
];

let createBot = () => {
  const bots = botTokens.map((token) => {
    return new TelegramBot(token, { polling: true });
  });

  // Bắt sự kiện khi mỗi bot nhận được tin nhắn
  bots.forEach((bot) => {
    bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      const inputText = msg.text;
      if (inputText === '/start') {
        bot.sendMessage(chatId, `Xin chào!`);
      } else {
        const putputText = "Bạn vừa nhắn " + inputText
        bot.sendMessage(chatId, putputText);
      }
    });
  });
}

module.exports = createBot;
