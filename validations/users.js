'use strict';

const Joi = require('joi');

module.exports.get = {
  params: Joi.object().keys({
    id: Joi.number()
          .integer()
          .positive()
          .required()
  })
};

module.exports.post = {
  body: Joi.object().keys({
    firstName: Joi.string()
          .trim()
          .alphanum()
          .min(1)
          .max(20)
          .required(),
    email: Joi.string()
          .trim()
          .email()
          .required(),
    password: Joi.string()
          .trim()
          .min(8)
          .max(256)
          .required()
  })
};
