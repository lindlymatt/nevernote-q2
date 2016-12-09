'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('userNotes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('userNotes').insert({
          id: 1,
          userId: 1,
          noteId: 2,
          readOnly: false
        }),
        knex('userNotes').insert({
          id: 2,
          userId: 2,
          noteId: 3,
          readOnly: false
        }),
        knex('userNotes').insert({
          id: 3,
          userId: 3,
          noteId: 1,
          readOnly: false
        }),
        knex('userNotes').insert({
          id: 4,
          userId: 4,
          noteId: 5,
          readOnly: false
        }),
        knex('userNotes').insert({
          id: 5,
          userId: 5,
          noteId: 4,
          readOnly: false
        }),
      ]);
    })
    .then(() => knex.raw("SELECT setval('userNotes_id_seq', (SELECT MAX(id) FROM userNotes))"));
};
