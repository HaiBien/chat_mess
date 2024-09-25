const fs = require('fs');

let getPDF = (req, res) => {
    const filePath = 'E:/Thinklabs/owllee/chat_mess/src/controllers/TÀI LIỆU HƯỚNG DẪN SỬ DỤNG OWLLEE.pdf';
    const file = fs.readFileSync(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(file);
};

module.exports = {
    getPDF: getPDF,
}