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
