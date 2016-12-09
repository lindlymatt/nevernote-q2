'use strict';

exports.up = function (knex, Promise) {
  // Creates the noteTags's database, with columns:
  //  id, userId, noteId, tag.
  return knex.schema.createTable('noteTags', table => {
    table.increments();
    table.integer('userId').notNullable()
      .references('id').inTable('users');
    table.integer('noteId').notNullable()
      .references('id').inTable('notes');
    table.text('tag').notNullable();
  });
};

exports.down = function (knex, Promise) {
  // Drops the user's database.
  return knex.schema.dropTable('noteTags');
};
