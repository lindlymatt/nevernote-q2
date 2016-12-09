exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('folders').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('folders').insert({
          id: 1,
          user_id: 1,
          name: 'Super Folder',
          is_secure: false,
        }),
        knex('folders').insert({
          id: 2,
          user_id: 2,
          name: 'Passwords Folder',
          is_secure: true,
        }),
        knex('folders').insert({
          id: 3,
          user_id: 2,
          name: 'I gave my wife to Lindly',
          is_secure: false,
        }),
        knex('folders').insert({
          id: 4,
          user_id: 3,
          name: 'Lindly over Pestridge',
          is_secure: false,
        })
      ]);
    })
    .then(() => knex.raw("SELECT setval('folders_id_seq', (SELECT MAX(id) FROM folders))"));
};
