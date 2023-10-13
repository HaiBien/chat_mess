import express from "express";
import HomeController from "../controllers/HomeController";
import FBController from "../controllers/FacebookController";
import FbController from "../controllers/FbController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", HomeController.getHomePage);
  router.post('/webhook', HomeController.postWebhook);
  router.get('/webhook', HomeController.getWebhook);
  router.get('/fanpages', HomeController.getPageList);
  router.get('/login', FBController.loginFacebook);
  router.get('/callback', FBController.facebookCallback);

  return app.use('/', router);
}

module.exports = initWebRoutes;