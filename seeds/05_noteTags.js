'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('note_tags').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('note_tags').insert({
          id: 1,
          user_id: 1,
          note_id: 2,
          tag: 'Awesome'
        }),
        knex('note_tags').insert({
          id: 2,
          user_id: 2,
          note_id: 3,
          tag: 'Sucks'
        }),
        knex('note_tags').insert({
          id: 3,
          user_id: 3,
          note_id: 1,
          tag: 'Awesome'
        }),
        knex('note_tags').insert({
          id: 4,
          user_id: 4,
          note_id: 5,
          tag: 'Kewl'
        }),
        knex('note_tags').insert({
          id: 5,
          user_id: 5,
          note_id: 4,
          tag: 'Synth'
        })
      ]);
    })
    .then(() => knex.raw("SELECT setval('note_tags_id_seq', (SELECT MAX(id) FROM note_tags))"));
};
