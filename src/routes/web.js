import express from "express";
import HomeController from "../controllers/HomeController";
import TelegramCtrl from "../controllers/TelegramCtrl";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", HomeController.getHomePage);
  router.post('/telegram/webhook', TelegramCtrl.telegramWebhook);
  router.get("/webhook", HomeController.getWebhook);
  router.post('/webhook', HomeController.postWebhook);

  return app.use('/', router);
}

module.exports = initWebRoutes;