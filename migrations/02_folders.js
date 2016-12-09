'use strict';

exports.up = function (knex, Promise) {
  // Creates the user's database, with columns:
  //  id, firstName, email, hashedPassword, timestamps.
  return knex.schema.createTable('folders', table => {
    table.increments();
    table.integer('user_id').notNullable()
      .references('id').inTable('users');
    table.integer('parent_folder')
      .references('id').inTable('folders').defaultTo(null);
    table.text('name').notNullable().defaultTo('New Folder');
    table.boolean('is_secure').defaultTo(false);
  });
};

exports.down = function (knex, Promise) {
  // Drops the user's database.
  return knex.schema.dropTable('folders');
};
