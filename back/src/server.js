const express = require("express");
const validate = require("express-validation");
const cors = require("cors");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";
    this.middlewares();
    this.routes();
    this.exception();
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
}

module.exports = new App().express;
