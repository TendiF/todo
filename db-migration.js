var db_config = require('./db-config');


const knex = require('knex')({
    client: 'mysql',
    connection: db_config,
  });
   
  // Create a table
  knex.schema
    .createTable('users', table => {
      table.increments('id');
      table.string('username');
      table.string('password');
      table.timestamps(true,true);
    })
   
    // ...and another
    .createTable('todo', table => {
      table.increments('id');
      table.string('name');
      table
        .integer('id_user')
        .unsigned()
        .references('users.id');
        table.timestamps(true, true);
    })
   
    // Then query the table...
    .then(() =>
      knex('users').insert({ username: 'Tim' })
    )
   
    // ...and using the insert id, insert into the other table.
    .then(rows => {
        console.log('rows', rows)
        return knex('todo').insert({ name: 'knex', id_user: rows[0] })
      }
    )
   
    // Query both of the rows.
    .then(() => 
      knex('users')
        .join('todo', 'users.id', 'todo.id_user')
        .select('users.username as user', 'todo.name as account')
    )
   
    // Finally, add a .catch handler for the promise chain
    .catch(e => {
      console.error(e);
    });