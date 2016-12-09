exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('folders').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('folders').insert({
          id: 1,
          userId: 1,
          name: 'Super Folder',
          isSecure: false,
        }),
        knex('folders').insert({
          id: 2,
          userId: 2,
          name: 'Passwords Folder',
          isSecure: true,
        }),
        knex('folders').insert({
          id: 3,
          userId: 2,
          name: 'I gave my wife to Lindly',
          isSecure: false,
        }),
        knex('folders').insert({
          id: 4,
          userId: 3,
          name: 'Lindly over Pestridge',
          isSecure: false,
        })
      ]);
    })
    .then(() => knex.raw("SELECT setval('folders_id_seq', (SELECT MAX(id) FROM folders))"));
};
