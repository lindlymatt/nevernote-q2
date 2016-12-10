'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/filesystem/:user_id', (req, res, next) => {
  var userFolders;
  var userNotes;
  Promise.all([
    knex('folders')
    .where('user_id', req.params.user_id)
    .orderBy('name')
    .then((folders) => {
      userFolders = folders;
    }),
    knex('notes')
    .join('user_notes', 'notes.id', '=', 'user_notes.note_id')
    .where('user_id', req.params.user_id)
    .select('*')
    .orderBy('name')
    .then((notes) => {
      userNotes = notes;
    })
  ]).then(() => {
    // console.log(userFolders, userNotes);
    var result = filesystem(userFolders, userNotes);
    res.send(result);
  })
});

function filesystem(folders, notes){
  var userStuff = {
    folders: [],
    notes: [],
  };
  //adding notes without parents to userStuff
  for(var i = 0; i < notes.length; i++) {
    if(notes[i].parent_folder === null) {
      userStuff.notes.push(notes[i]);
    }
  };
  //add notes with parent folders to their folders but has to happen after folderNotes

  //adding parent folders
  for(var i = 0; i < folders.length; i++) {
    if(folders[i].parent_folder === null) {
      userStuff.folders.push(folders[i]);
    }
  };
  //adding childFolder arr and folderNotes arr to each folder obj
  for(var i = 0; i < userStuff.folders.length; i++) {
    userStuff.folders[i].childFolders = [];
    userStuff.folders[i].folderNotes = [];
  }
  //inserting child folders
  for(var i = 0; i < folders.length; i++) {
    if(folders[i].parent_folder !== null) {
      for(var x = 0; x < userStuff.folders.length; x++) {
        if(folders[i].parent_folder === userStuff.folders[x].id) {
          userStuff.folders[x].childFolders.push(folders[i]);
        }
      }
    }
  };
  //add notes with parent folders to their respective folders
  for(var i = 0; i < notes.length; i++) {
    if(notes[i].parent_folder !== null) {
      // console.log('not null');

      // userStuff.folders[i].
    }
  }
  return userStuff;
};

module.exports = router;
