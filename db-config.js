let { DB_PASSWORD, DB_HOST, DB_USERNAME, DB_DATABASENAME } = process.env

let db_config = {
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASENAME
}

module.exports = db_config