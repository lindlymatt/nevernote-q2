'use strict';

exports.up = function (knex, Promise) {
  // Creates the user's database, with columns:
  //  id, firstName, email, hashedPassword, timestamps.
  return knex.schema.createTable('folderNotes', table => {
    table.increments();
    table.integer('noteId').notNullable()
      .references('id').inTable('notes');
    table.integer('folderId').notNullable()
      .references('id').inTable('folders');
  });
};

exports.down = function (knex, Promise) {
  // Drops the user's database.
  return knex.schema.dropTable('folderNotes');
};
