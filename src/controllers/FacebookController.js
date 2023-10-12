const request = require('request');

const appId = '1358287981761652';
const appSecret = 'e0550036427ecd67f3a82fb157ae34fd';
const redirectUri = 'https://chat-mess.onrender.com';

// Route to initiate the Facebook login
let loginFacebook = (req, res) => {
  const authUrl = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=email,user_friends`;
  console.log('authUrl', authUrl)
  res.redirect(authUrl);
};

let facebookCallback = (req, res) => {
  const code = req.query.code;
  console.log('code', code)
  const tokenUrl = `https://graph.facebook.com/v13.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${appSecret}&code=${code}`;
  request(tokenUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      const accessToken = data.access_token;
      res.send(`Access Token: ${accessToken}`);
    } else {
      res.send('Error getting access token');
    }
  });
};

module.exports = {
  loginFacebook: loginFacebook,
  facebookCallback: facebookCallback,
}