const TelegramBot = require('node-telegram-bot-api');

// Thay thế 'YOUR_TELEGRAM_BOT_TOKEN' bằng token của bot Telegram của bạn
const TOKEN = '7082275872:AAFw41Pc4ee2wjemcp8hCIctgagQZJY5w_w';

// Khởi tạo bot

let getHistory = (req, res) => { 
    console.log(1111)
    const bot = new TelegramBot(TOKEN, { polling: true });
    bot.on('message', () => {
        bot.getChat('890490235').then(message => {
                console.log(message);
        }).catch(err => {
            console.log('Error:', err.message);
        });
    });
}

module.exports = {
    getHistory: getHistory,
}