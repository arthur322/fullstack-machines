const Joi = require("joi");

module.exports = {
  body: {
    statusId: Joi.number().required()
  }
};
