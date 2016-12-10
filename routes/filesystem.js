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
  //adding parent folders
  for(var i = 0; i < folders.length; i++) {
    if(folders[i].parent_folder === null) {
      userStuff.folders.push(folders[i]);
    }
  };
  // for(var i = 0; i < userStuff.folders.length; i++) {
  //   console.log(typeof(userStuff.folders[i]));
  //   userStuff.folders[i].childFolders = [];
  // }
  //inserting child folders
  for(var i = 0; i < folders.length; i++) {
    if(folders[i].parent_folder !== null) {
      //getting in here expected num of times!
      for(var x = 0; x < userStuff.folders.length; x++) {
        userStuff.folders[x].childFolders = [];
        //running expected num of times
        // console.log(folders[i].parent_folder);
        // console.log(userStuff.folders[x].id);
        if(folders[i].parent_folder === userStuff.folders[x].id) {
          // userStuff.folders[x].childFolders.push(folders[i]);
          console.log('sickk');
        }
      }
    }
  };
  //need to add notes to their respective folders
  // for(var i = 0; i < notes.length; i++) {
  //   if(notes[i].parent_folder !== null) {
  //
  //   }
  // }
  return userStuff;
};

// userStuff = {
//   folders: {
//     folder: {
//       stuff
//       childFolders: null or shows child folders
//     }
//   }
//   notes: {
//     note: notes where parent is null
//   }
// }

module.exports = router;
