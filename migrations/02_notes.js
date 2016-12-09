'use strict';

exports.up = function (knex, Promise) {
  // Creates the notes's database, with columns:
  //  id, name, content, timestamps.
  return knex.schema.createTable('notes', table => {
    table.increments();
    table.text('name').defaultTo('');
    table.text('content').defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  // Drops the user's database.
  return knex.schema.dropTable('notes');
};
