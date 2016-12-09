'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('folder_notes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('folder_notes').insert({
          id: 1,
          note_id: 2,
          folder_id: 1
        }),
        knex('folder_notes').insert({
          id: 2,
          note_id: 3,
          folder_id: 3
        }),
        knex('folder_notes').insert({
          id: 3,
          note_id: 1,
          folder_id: 2
        }),
        knex('folder_notes').insert({
          id: 4,
          note_id: 5,
          folder_id: 4
        }),
      ]);
    })
    .then(() => knex.raw("SELECT setval('folder_notes_id_seq', (SELECT MAX(id) FROM folder_notes))"));
};
