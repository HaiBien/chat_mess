import express from "express";
import ProxyCtrl from "../controllers/Proxy";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/proxy", ProxyCtrl.getProxy);
  return app.use('/', router);
}

module.exports = initWebRoutes;