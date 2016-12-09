'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('noteTags').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('noteTags').insert({
          id: 1,
          userId: 1,
          noteId: 2,
          tag: 'Awesome'
        }),
        knex('noteTags').insert({
          id: 2,
          userId: 2,
          noteId: 3,
          tag: 'Sucks'
        }),
        knex('noteTags').insert({
          id: 3,
          userId: 3,
          noteId: 1,
          tag: 'Awesomest'
        }),
        knex('noteTags').insert({
          id: 4,
          userId: 4,
          noteId: 5,
          tag: 'Kewl'
        }),
        knex('noteTags').insert({
          id: 5,
          userId: 5,
          noteId: 4,
          tag: 'Synth'
        })
      ]);
    })
    .then(() => knex.raw("SELECT setval('noteTags_id_seq', (SELECT MAX(id) FROM noteTags))"));
};
