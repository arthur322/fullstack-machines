const Joi = require("joi");

module.exports = {
  body: {
    code: Joi.string().required(),
    status: Joi.string().required()
  }
};
