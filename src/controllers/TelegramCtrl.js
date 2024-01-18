const request = require('request');
const axios = require('axios');

const access_token = '6751496230:AAGeOscaQE2lAQ9pGXtQTPr3uYf1le2yF0Y'

const telegramWebhook = async (req, res) => {
  const { message } = req.body;
  console.log('message', message)


  const reply_message = "**Name:** Lee Jung"

  if (message) {
    const url = `https://api.telegram.org/bot${access_token}/sendMessage`
    const payload = {
      "chat_id": message.chat.id,
      "text": reply_message,
      "reply_to_message_id": message.message_id,
    }
    const response = await axios.post(url, payload);
  }

}

module.exports = {
  telegramWebhook: telegramWebhook,
}