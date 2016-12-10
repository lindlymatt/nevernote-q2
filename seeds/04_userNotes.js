'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_notes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('user_notes').insert({
          id: 1,
          user_id: 3,
          note_id: 3,
          read_only: false
        }),
        knex('user_notes').insert({
          id: 2,
          user_id: 3,
          note_id: 2,
          read_only: false
        }),
        knex('user_notes').insert({
          id: 3,
          user_id: 3,
          note_id: 1,
          read_only: true
        }),
        knex('user_notes').insert({
          id: 4,
          user_id: 4,
          note_id: 5,
          read_only: false
        }),
        knex('user_notes').insert({
          id: 5,
          user_id: 5,
          note_id: 4,
          read_only: false
        }),
        knex('user_notes').insert({
          id: 6,
          user_id: 2,
          note_id: 6,
          read_only: false
        })
      ]);
    })
    .then(() => knex.raw("SELECT setval('user_notes_id_seq', (SELECT MAX(id) FROM user_notes))"));
};
