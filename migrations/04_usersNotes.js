'use strict';

exports.up = function (knex, Promise) {
  // Creates the userNote's database, with columns:
  //  id, userId, noteId, readOnly.
  return knex.schema.createTable('userNotes', table => {
    table.increments();
    table.integer('userId').notNullable()
      .references('id').inTable('users');
    table.integer('noteId').notNullable()
      .references('id').inTable('notes');
    table.boolean('readOnly').defaultsTo(false);
  });
};

exports.down = function (knex, Promise) {
  // Drops the user's database.
  return knex.schema.dropTable('userNotes');
};
