'use strict';

exports.up = function (knex, Promise) {
  // Creates the user's database, with columns:
  //  id, firstName, email, hashedPassword, timestamps.
  return knex.schema.createTable('users', table => {
    table.increments();
    table.text('first_name').notNullable();
    table.text('email').notNullable().unique();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  // Drops the user's database.
  return knex.schema.dropTable('users');
};
