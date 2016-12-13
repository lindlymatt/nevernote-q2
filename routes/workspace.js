'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  const user = req.body.userId;
  knex('folders')
    .where('folders.user_id', user)
    .then((folders) => {

      let workspace = {
        "folders": [],
        "notes": []
      };

      folders.map(folder => {
        folder.childFolders = [];
        folder.folderNotes = [];
        return folder;
      });

      for (let i = 0; i < folders.length; i++) {
        let folder = folders[i];
        if (folder.parent_folder) {

          let parentFolder;
          for (let j = 0; j < folders.length; j++) {
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

      knex('notes')
        .innerJoin('user_notes', 'notes.id', 'user_notes.note_id')
        .where('user_notes.user_id', user)
        .then((notes) => {

          notes.forEach((note) => {
            if (note.parent_folder) {
              let parentFolder;
              for (let i = 0; i < folders.length; i++) {
                let foundParent = findParentFolder(folders[i], note.parent_folder);
                if (foundParent) {
                  parentFolder = foundParent;
                  break;
                }
              }
              parentFolder.folderNotes.push(note);
            } else {
              workspace.notes.push(note);
            }
          });
          workspace.folders.push(...folders);
          res.json(workspace);
        })
        .catch((err) => {
          next(err);
        });
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

module.exports = router;
