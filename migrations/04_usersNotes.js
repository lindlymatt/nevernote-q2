'use strict';

exports.up = function (knex, Promise) {
  // Creates the userNote's database, with columns:
  //  id, userId, noteId, readOnly.
  return knex.schema.createTable('user_notes', table => {
    table.increments();
    table.integer('user_id').notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.integer('note_id').notNullable()
      .references('id').inTable('notes').onDelete('CASCADE');
    table.boolean('read_only').defaultTo(false);
  });
};

exports.down = function (knex, Promise) {
  // Drops the user's database.
  return knex.schema.dropTable('user_notes');
};
