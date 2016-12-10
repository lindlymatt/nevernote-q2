'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('notes').insert({
          id: 1,
          content: "This is Matt Lindly's note \n ## This is the second line.",
          name: 'Lindly Test Note'
        }),
        knex('notes').insert({
          id: 2,
          content: "This is Aidan Baack's note \n ## This is the second line.",
          name: 'Baack Test Note'
        }),
        knex('notes').insert({
          id: 3,
          parent_folder: 3,
          content: "This is Matt Pestridge's note \n ## This is the second line.",
          name: 'Pestridge Test Note'
        }),
        knex('notes').insert({
          id: 4,
          content: "This is Devin Hurd's note \n ## This is the second line.",
          name: 'Hurd Test Note'
        }),
        knex('notes').insert({
          id: 5,
          content: "This is Malila's note \n ## This is the second line.",
          name: 'Clearwater Test Note'
        }),
        knex('notes').insert({
          id:6,
          content: "I love my wife",
          name: "<3"
        })
      ]);
    })
    .then(() => knex.raw("SELECT setval('notes_id_seq', (SELECT MAX(id) FROM notes))"));
};
