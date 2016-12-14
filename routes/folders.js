'use strict';

// This route needs to be to do:
  // GET: All of the folders in the database. GET/id: Gets a specific folder info.
  // POST: Adds a folder to the database.
  // PATCH: Updates a folder's information in the database.
  // DELETE: Delete's the folder from the database.

var express = require('express');
var router = express.Router();
var ev = require('express-validation');
var validations = require('../validations/folders');
var knex = require('../knex');
var bcrypt = require('bcrypt-as-promised');
const { camelizeKeys, decamelizeKeys } = require('humps');

// GET: All of the folders.
router.get('/', (req, res, next) => {
  // Queries and gets all folders.
  knex('folders')
    .then((results) => {
      // Sends results back to the user.
      res.send(camelizeKeys(results));
    })
    .catch((err) => {
      // Sends the error to the next available middleware.
      next(err);
    });
});

// GET w/ ID: Get a folder by it's ID.
router.get('/:id', ev(validations.get), (req, res, next) => {
  const id = req.params.id;

  // Queries the folder database looking for a specific folder.
  knex('folders')
    .where('folders.id', id)
    // .andWhere('folders.user_id', uid)
    .first()
    .then((result) => {
      if(!result) {
        // If there's no folder found, then send back a 404.
        return res.status(404).send('Not Found.');
      }

      // Once found, send back a 200 with the folder information.
      res.status(200).send(camelizeKeys(result));
    })
    .catch(err => {
      next(err);
    });
});

// POST: Creates a new folder.
router.post('/', ev(validations.post), (req, res, next) => {
  console.log(req);
  let { name, parentFolder, isSecure } = req.body;

  knex('folders')
    .where('folders.user_id', req.body.userId)
    .then((folders) => {
      if (Number.isInteger(parentFolder)) {
        const parentFolderInFolders = folders.some((folder) => {
          return parentFolder === folder.id;
        });

        if (!parentFolderInFolders) {
          return res.status(404).send('Parent folder not found');
        }
      } else {
        parentFolder = null;
      }

      let newFolder = {
        name,
        is_secure: isSecure,
        parent_folder: parentFolder,
        user_id: req.body.userId,
      };
      knex('folders')
        .insert(newFolder, ['id', 'name'])
        .then((result) => {
          res.status(200).send(camelizeKeys(result));
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

// PATCH w/ ID: Updates a user's folder that has the given ID.
router.patch('/:id', ev(validations.patch), (req, res, next) => {
  const id = req.params.id;
  const { name, parentFolder, isSecure } = req.body;

  let updatedFolder = {
    name,
    parent_folder: parentFolder,
    is_secure: isSecure };
  knex('folders')
    .where('folders.id', id)
    .update(updatedFolder, ['name'])
    .then((result) => {
      res.status(200).send(camelizeKeys(result));
    })
    .catch((err) => {
      next(err);
    });
});

// DELETE w/ ID: Deletes a folder by ID.
router.delete('/:id', ev(validations.delete), (req, res, next) => {
  const id = req.params.id;

  knex('folders')
    .where('folders.id', id)
    .del(['name'])
    .then((result) => {
      res.status(200).send(camelizeKeys(result));
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
