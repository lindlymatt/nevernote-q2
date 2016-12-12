'use strict';

const Joi = require('joi');

module.exports.post = {
  body: Joi.object().keys({
    email: Joi.string()
          .trim()
          .email(),
    password: Joi.string()
          .trim()
          .min(8)
          .max(256)
  })
};
