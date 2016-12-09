'use strict';

exports.up = function (knex, Promise) {
  // Creates the userNote's database, with columns:
  //  id, userId, noteId, readOnly.
  return knex.schema.createTable('user_notes', table => {
    table.increments();
    table.integer('user_id').notNullable()
      .references('id').inTable('users');
    table.integer('note_id').notNullable()
      .references('id').inTable('notes');
    table.boolean('read_only').defaultsTo(false);
  });
};

exports.down = function (knex, Promise) {
  // Drops the user's database.
  return knex.schema.dropTable('user_notes');
};
