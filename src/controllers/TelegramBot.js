const bot = require('./telegram');

async function handleMessage(msg) {
  const chatId = msg.chat.id;

  console.log('msg', msg)

  const inputText = msg.text;
  if (inputText) {
    console.log('telegram bot: ' + inputText)
    // Xử lý tin nhắn từ người dùng ở đây và trả lời lại (nếu cần).
    const outputText = 'Bạn vừa gửi: ' + inputText
    bot.sendMessage(chatId, outputText);
  }

}
module.exports = {
  handleMessage,
};