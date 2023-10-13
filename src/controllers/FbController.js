const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const router = express.Router();

// Cấu hình Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: 'YOUR_APP_ID',
      clientSecret: 'YOUR_APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // Xử lý access token và dữ liệu người dùng ở đây
      return done(null, profile);
    }
  )
);

// Cấu hình Passport
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Định nghĩa route để bắt đầu quá trình đăng nhập
router.get('/login', passport.authenticate('facebook'));

// Định nghĩa route để xử lý callback sau khi đăng nhập Facebook
router.get(
  '/callback',
  passport.authenticate('facebook', {
    successRedirect: '/success', // Redirect tới trang thành công
    failureRedirect: '/failure', // Redirect tới trang lỗi
  })
);

module.exports = router;
