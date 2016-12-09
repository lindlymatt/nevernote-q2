'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('folderNotes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('folderNotes').insert({
          id: 1,
          noteId: 2,
          folderId: 1
        }),
        knex('folderNotes').insert({
          id: 2,
          noteId: 3,
          folderId: 3
        }),
        knex('folderNotes').insert({
          id: 3,
          noteId: 1,
          folderId: 2
        }),
        knex('folderNotes').insert({
          id: 4,
          noteId: 5,
          folderId: 4
        }),
      ]);
    })
    .then(() => knex.raw("SELECT setval('folderNotes_id_seq', (SELECT MAX(id) FROM folderNotes))"));
};
