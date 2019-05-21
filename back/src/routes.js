const express = require("express");
const validateMiddleware = require("express-validation");
const MachineSchema = require("./app/schemas/Machine");
const StatusSchema = require("./app/schemas/Status");
const ChangeStatusSchema = require("./app/schemas/ChangeStatus");

const routes = express.Router();

const MachineController = require("./app/Controllers/MachineController");
const StatusController = require("./app/Controllers/StatusController");

routes.get("/", (req, res) => res.send("Hello world!"));

// Machine routes
routes.get("/machines", MachineController.all);

routes.post(
  "/machines",
  validateMiddleware(MachineSchema),
  MachineController.create
);

routes.put(
  "/machines/:id",
  validateMiddleware(MachineSchema),
  MachineController.update
);

routes.delete("/machines/:id", MachineController.delete);

routes.get("/machines/change-status", MachineController.changeStatus);

routes.get("/machines/:id", MachineController.show);

// Status routes
routes.get("/status", StatusController.all);

routes.get("/status/:id", StatusController.show);

routes.post(
  "/status",
  validateMiddleware(StatusSchema),
  StatusController.create
);

routes.put(
  "/status/:id",
  validateMiddleware(StatusSchema),
  StatusController.update
);

routes.delete("/status/:id", StatusController.delete);

// Cron routes
routes.get("/random-machine-start", MachineController.startRandonMachines);

routes.get("/random-machine-stop", MachineController.stopRandonMachines);

routes.get(
  "/random-machine-change",
  MachineController.changeRandonMachinesTime
);

module.exports = routes;
