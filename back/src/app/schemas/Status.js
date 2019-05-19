const Joi = require("joi");

module.exports = {
  body: {
    status: Joi.string().required()
  }
};
