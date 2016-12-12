'use strict';

const Joi = require('joi');

module.exports.post = {
  body: Joi.object().keys({
    noteId: Joi.number()
          .integer()
          .positive()
          .required(),
    foreignUser: Joi.number()
          .integer()
          .positive(),
    readOnly: Joi.boolean()
  })
};

module.exports.patch = {
  body: Joi.object().keys({
    userId: Joi.number()
          .integer()
          .positive(),
    noteId: Joi.number()
          .integer()
          .positive(),
    readOnly: Joi.boolean()
  })
};

module.exports.delete = {
  params: Joi.object().keys({
    id: Joi.number()
          .integer()
          .positive()
  })
};
