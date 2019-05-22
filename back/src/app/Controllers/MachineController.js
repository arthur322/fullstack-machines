const {
  successResponse,
  notFoundResponse,
  errorResponse
} = require("../utils/ApiResponses");

const CronService = require("../services/CronService");

const { Machine, Status, StatusHistory } = require("../models");

class MachineController {
  constructor() {
    this.socket = null;
    this.cronService = new CronService(this.changeStatus);
  }

  startRandonMachines(req, res) {
    this.cronService.stop();
    this.cronService.start("", req.app.get("sockett"));
    return successResponse(res, "Cron iniciado.");
  }

  stopRandonMachines(req, res) {
    this.cronService.stop();
    return successResponse(res, "Cron parado.");
  }

  changeRandonMachinesTime(req, res) {
    this.cronService.stop();
    this.cronService.start(req.query.time, req.app.get("sockett"));
    return successResponse(res, "Tempo do cron alterado.");
  }

  async all(req, res) {
    const machines = await Machine.findAll();

    await Promise.all(
      machines.map(async machine => {
        machine.setDataValue("lastStatus", await machine.getLastStatus());
        machine.setDataValue("statusHistory", await machine.getStatusHistory());
      })
    );

    return res.json(machines);
  }

  async create(req, res) {
    try {
      const { name } = req.body;
      const result = await Machine.create({
        name
      });

      return successResponse(res, result);
    } catch (error) {
      console.log(error);
      return errorResponse(res, error.message);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      let machineModel = await Machine.findOne({
        where: { id },
        include: {
          model: Status,
          as: "statuses",
          required: false,
          through: { attributes: [] }
        }
      });

      if (!machineModel) {
        return notFoundResponse(res, "Machine not found.");
      }

      machineModel.setDataValue(
        "lastStatus",
        await machineModel.getLastStatus()
      );

      machineModel.setDataValue(
        "statusHistory",
        await machineModel.getStatusHistory()
      );

      return successResponse(res, machineModel);
    } catch (error) {
      console.log(error);
      return errorResponse(res, error.message);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const machine = await Machine.findOne({
        where: { id }
      });

      if (!machine) {
        return notFoundResponse(res, "Machine not found.");
      }

      const updated = await machine.update({
        name
      });

      return successResponse(res, updated);
    } catch (error) {
      console.log(error);
      return errorResponse(res, error.message);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const machine = await Machine.findOne({
        where: { id }
      });

      if (!machine) {
        return notFoundResponse(res, "Machine not found.");
      }

      await machine.destroy();

      return successResponse(res, "Machine deleted with success.");
    } catch (error) {
      console.log(error);
      return errorResponse(res, error.message);
    }
  }

  async changeStatus() {
    try {
      const statusesModel = await Status.findAll({
        attributes: ["id"],
        raw: true
      });

      if (!statusesModel) {
        return;
      }

      const machines = await Machine.findAll({
        attributes: ["id"],
        raw: true
      });

      if (!machines) {
        return;
      }

      const statusCreated = [];

      await Promise.all(
        machines.map(async machine => {
          let randomStatus =
            statusesModel[Math.floor(Math.random() * statusesModel.length)];
          const historyCreated = await StatusHistory.create({
            machine_id: machine.id,
            status_id: randomStatus.id
          });
          statusCreated.push(historyCreated.get({ plain: true }));
        })
      );

      const AllMachines = await Machine.findAll();

      await Promise.all(
        AllMachines.map(async machine => {
          machine.setDataValue("lastStatus", await machine.getLastStatus());
          machine.setDataValue(
            "statusHistory",
            await machine.getStatusHistory()
          );
        })
      );

      return AllMachines;
    } catch (error) {
      console.log(error);
      return errorResponse(res, error.message);
    }
  }
}

module.exports = new MachineController();
