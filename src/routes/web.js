import express from "express";
import FacebookCtrl from "../controllers/FacebookCtrl";
import TelegramCtrl from "../controllers/TelegramCtrl";
import WebviewPDF from "../controllers/WebviewPDF";
import TeleHistory from "../controllers/TeleHistory";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", FacebookCtrl.getHomePage);
  router.post('/telegram/webhook', TelegramCtrl.telegramWebhook);
  router.get('/telegram/history', TeleHistory.getHistory);
  router.get("/webhook", FacebookCtrl.getWebhook);
  router.get("/pdf", WebviewPDF.getPDF);
  router.post('/webhook', FacebookCtrl.postWebhook);

  return app.use('/', router);
}

module.exports = initWebRoutes;