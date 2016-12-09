'use strict';

exports.up = function (knex, Promise) {
  // Creates the user's database, with columns:
  //  id, firstName, email, hashedPassword, timestamps.
  return knex.schema.createTable('folder_notes', table => {
    table.increments();
    table.integer('note_id').notNullable()
      .references('id').inTable('notes');
    table.integer('folder_id').notNullable()
      .references('id').inTable('folders');
  });
};

exports.down = function (knex, Promise) {
  // Drops the user's database.
  return knex.schema.dropTable('folder_notes');
};
