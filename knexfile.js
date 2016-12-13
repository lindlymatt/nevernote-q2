// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/dev_db'
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: 'postgres://gqoygczydflqbw:0da096af25950a06ca2bb29f7c0cd40cf12212a32176a3d0813f66b4fa0d7858@ec2-54-235-153-124.compute-1.amazonaws.com:5432/dffbjd2nm6vgf7'
  }

};
