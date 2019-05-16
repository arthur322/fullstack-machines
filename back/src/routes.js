const express = require("express");

const routes = express.Router();

const MachineController = require("./app/Controllers/MachineController");

routes.get("/", (req, res) => res.send("Hello world!"));

routes.get("/machines", (req, res) => MachineController.all(req, res));

module.exports = routes;
