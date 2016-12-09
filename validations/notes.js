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
    parentFolder: Joi.number()
          .integer()
          .positive(),
    name: Joi.string()
          .trim()
          .min(1)
          .max(50),
    content: Joi.string()
  })
};

module.exports.patch = {
  body: Joi.object().keys({
    parentFolder: Joi.number()
          .integer()
          .positive(),
    name: Joi.string()
          .trim()
          .min(1)
          .max(50),
    content: Joi.string()
  }).or('firstName', 'email', 'password'),

  params: Joi.object().keys({
    id: Joi.number()
          .integer()
          .positive()
          .required()
  })
};

module.exports.delete = {
  params: Joi.object().keys({
    id: Joi.number()
          .integer()
          .positive()
          .required()
  })
};
