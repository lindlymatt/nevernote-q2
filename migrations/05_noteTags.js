'use strict';

exports.up = function (knex, Promise) {
  // Creates the noteTags's database, with columns:
  //  id, userId, noteId, tag.
  return knex.schema.createTable('note_tags', table => {
    table.increments();
    table.integer('user_id').notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.integer('note_id').notNullable()
      .references('id').inTable('notes').onDelete('CASCADE');
    table.text('tag').notNullable();
  });
};

exports.down = function (knex, Promise) {
  // Drops the user's database.
  return knex.schema.dropTable('note_tags');
};
