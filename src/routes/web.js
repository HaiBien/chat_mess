import express from "express";
import FacebookCtrl from "../controllers/FacebookCtrl";
import TelegramCtrl from "../controllers/TelegramCtrl";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", FacebookCtrl.getHomePage);
  router.post('/telegram/webhook', TelegramCtrl.telegramWebhook);
  router.get("/get-webhook", FacebookCtrl.getWebhook);
  router.post('/webhook', FacebookCtrl.postWebhook);

  return app.use('/', router);
}

module.exports = initWebRoutes;