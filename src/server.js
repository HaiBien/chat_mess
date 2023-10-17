import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import webRoutes from "./routes/web";
import createBot from "./controllers/TelegramBot"
import TelegramBotController from "./controllers/TelegramBot";


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);

webRoutes(app);

createBot();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log("App is running at the port: " + port);
})