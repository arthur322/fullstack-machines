const express = require("express");
const validate = require("express-validation");
const cors = require("cors");
const http = require("http");
const io = require("socket.io");
require("dotenv").config();

class App {
  constructor() {
    this.express = express();
    this.server = http.Server(this.express);
    this.io = io(this.server);
    this.isDev = process.env.NODE_ENV !== "production";
    this.middlewares();
    this.routes();
    this.exception();

    this.interval = null;

    this.socketIo();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use("/api", require("./routes"));
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }
    });
  }

  socketIo() {
    this.io.on("connection", client => {
      console.log("alguem entrou :)");

      // this.interval = setInterval(() => {
      //   this.io.emit("pingg", "oii koen");
      //   console.log("emitiu");
      // }, 1000);

      client.on("disconnect", () => {
        console.log("\ndesconectou");
      });
    });
  }
}

module.exports = new App().server;
