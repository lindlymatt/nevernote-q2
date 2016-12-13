'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const {camelizeKeys} = require('humps');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  const user = req.body.userId;
  knex('folders')
    .where('folders.user_id', user)
    .then((folders) => {
      let workspace = {
        "folders": [],
        "notes": []
      };

      let count = 0;

      folders.map(folder => {
        folder.childFolders = [];
        return folder;
      });

      for (let i = 0; i < folders.length; i++) {
        let folder = folders[i];
        if (folder.parent_folder) {

          let parentFolder;
          for (var j = 0; j < folders.length; j++) {
            let foundParent = findParentFolder(folders[j], folder.parent_folder);
            if (foundParent) {
              parentFolder = foundParent;
              break;
            }
          }
          parentFolder.childFolders.push(folder);
          folders.splice(i, 1);
          i = 0;
        }
      }
      res.json(folders);
    })
    .catch((err) => {
      next(err);
    });
});

function findParentFolder(topLevelFolder, parentFolderId) {
  if (isParent(topLevelFolder, parentFolderId)) {
    return topLevelFolder;
  }
  let childFolders = topLevelFolder.childFolders;
  for (let i = 0; i < childFolders.length; i++) {
    let childFolder = childFolders[i];
    let foundFolder = findParentFolder(childFolder, parentFolderId);
    if (foundFolder) {
      return foundFolder;
    }
  }
  return null;
}

function isParent(folder, parentFolderId) {
  return folder.id === parentFolderId;
}

//
// router.get('/', (req, res, next) => {
//   var userFolders;
//   var userNotes;
//   console.log(req.body);
//   Promise.all([
//     knex('folders')
//     .where('user_id', req.body.userId)
//     .orderBy('name')
//     .then((folders) => {
//       userFolders = folders;
//     }),
//     knex('notes')
//     .join('user_notes', 'notes.id', '=', 'user_notes.note_id')
//     .where('user_id', req.body.userId)
//     .select('*')
//     .orderBy('name')
//     .then((notes) => {
//       userNotes = notes;
//     })
//   ]).then(() => {
//     var result = getWorkspace(userFolders, userNotes);
//     res.send(camelizeKeys(result));
//   })
// });
//
// function getWorkspace(folders, notes){
// //add delete to for loops to reduce runtime
//   var userStuff = {
//     folders: [],
//     notes: [],
//   };
//
//   //adding notes without parents to userStuff & deleting note content 4 security
//   for(var i = 0; i < notes.length; i++) {
//     if(notes[i].parent_folder === null) {
//       userStuff.notes.push(notes[i]);
//     }
//     delete notes[i].content;
//   };
//
//   //adding childFolder arr and folderNotes arr to each folder obj
//   for(var i = 0; i < folders.length; i++) {
//     folders[i].childFolders = [];
//     folders[i].folderNotes = [];
//   };
//
//   //adding notes to their respective folders
//   for(var i = 0; i < notes.length; i++) {
//     if(notes[i].parent_folder !== null) {
//       for(var x = 0; x < folders.length; x++) {
//         if(notes[i].parent_folder === folders[x].id) {
//                 folders[x].folderNotes.push(notes[i]);
//         }
//       }
//     }
//   };
//
//   //adding parent folders
//   for(var i = 0; i < folders.length; i++) {
//     if(folders[i].parent_folder === null) {
//       userStuff.folders.push(folders[i]);
//       folders.splice(i, 1);
//     }
//   };
//
//   //inserting child folders
//     for(var i = 0; i < folders.length; i++) {
//         for(var x = 0; x < userStuff.folders.length; x++) {
//           if(folders[i].parent_folder === userStuff.folders[x].id) {
//             userStuff.folders[x].childFolders.push(folders[i]);
//           }
//         }
//       }
//   return userStuff;
// };
//
module.exports = router;
