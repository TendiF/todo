var db_config = require('./db-config');
const bcrypt = require('bcryptjs')


const knex = require('knex')({
    client: 'mysql',
    connection: db_config,
  });
   
  // Create a table
  knex.schema
    .createTable('users', table => {
      table.increments('id');
      table.string('email');
      table.string('password');
      table.timestamps(true,true);
    })
   
    // ...and another
    .createTable('todos', table => {
      table.increments('id');
      table.string('name');
      table.string('location');
      table
        .integer('id_user')
        .unsigned()
        .references('users.id');
      table.timestamp('when');
      table.timestamps(true, true);
    })
   
    // Then query the table...
    .then(async () =>{
      let password = await bcrypt.hash('asdasd', 8)
      return knex('users').insert({ email: 'tendifirmansyah30@gmail.com', password })
    })
   
    // ...and using the insert id, insert into the other table.
    .then(rows => {
        return knex('todos').insert({ name: 'knex', id_user: rows[0] })
      }
    )
   
    // Query both of the rows.
    .then(() => 
      knex('users')
        .join('todos', 'users.id', 'todos.id_user')
        .select('users.email as user', 'todos.name as account')
    )

    .then(() => {console.log('success migration');return process.exit(0)})
   
    // Finally, add a .catch handler for the promise chain
    .catch(e => {
      console.error(e);
      process.exit(1);
    });