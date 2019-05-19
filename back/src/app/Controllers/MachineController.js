const {
  successResponse,
  notFoundResponse,
  errorResponse
} = require("../utils/ApiResponses");

const { Machine, Status, StatusHistory } = require("../models");

class MachineController {
  async all(req, res) {
    const machines = await Machine.findAll();

    await Promise.all(
      machines.map(async machine => {
        machine.setDataValue("lastStatus", await machine.getLastStatus());
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

      const statusHistory = await machineModel.getStatuses({
        through: { attributes: [] },
        order: [["created_at", "desc"]]
      });

      machineModel.setDataValue("statusHistory", statusHistory);

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

  async changeStatus(req, res) {
    try {
      const { id } = req.params;
      const { statusId } = req.body;

      const statusModel = await Status.findOne({
        where: { id: statusId }
      });

      if (!statusModel) {
        return notFoundResponse(res, "Status not found.");
      }

      const machine = await Machine.findOne({
        where: { id }
      });

      if (!machine) {
        return notFoundResponse(res, "Machine not found.");
      }

      const historyCreated = await StatusHistory.create({
        machine_id: id,
        status_id: statusId
      });

      // const updated = await machine.createStatus(statusModel);

      return successResponse(res, historyCreated);
    } catch (error) {
      console.log(error);
      return errorResponse(res, error.message);
    }
  }
}

module.exports = new MachineController();
