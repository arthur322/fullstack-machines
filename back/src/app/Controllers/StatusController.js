const {
  successResponse,
  notFoundResponse,
  errorResponse
} = require("../utils/ApiResponses");

const { Status, Machine } = require("../models");

class StatusController {
  async all(req, res) {
    const status = await Status.findAll();
    return res.json(status);
  }

  async create(req, res) {
    try {
      const { status, code } = req.body;
      const result = await Status.create({
        status,
        code
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

      const statusModel = await Status.findOne({
        include: [
          {
            model: Machine,
            as: "machines"
          }
        ],
        where: { id }
      });

      if (!statusModel) {
        return notFoundResponse(res, "Status not found.");
      }

      console.log(statusModel);
      return successResponse(res, statusModel);
    } catch (error) {
      console.log(error);
      return errorResponse(res, error.message);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { status, code } = req.body;

      const statusModel = await Status.findOne({
        where: { id }
      });

      if (!statusModel) {
        return notFoundResponse(res, "Status not found.");
      }

      const updated = await statusModel.update({
        status,
        code
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

      const status = await Status.findOne({
        where: { id }
      });

      if (!status) {
        return notFoundResponse(res, "Status not found.");
      }

      await status.destroy();

      return successResponse(res, "Status deleted with success.");
    } catch (error) {
      console.log(error);
      return errorResponse(res, error.message);
    }
  }
}

module.exports = new StatusController();
