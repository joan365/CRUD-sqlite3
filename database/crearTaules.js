process.env["NODE_CONFIG_DIR"] = __dirname + "/../src/configuracions/";
const config = require('config');
const sqlite3 = require("sqlite3").verbose();
//Base de dades
const db = new sqlite3.Database(config.get('db.arxiu'), err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database: ", config.get('db.arxiu'));
});

const sql_create_clients = `CREATE TABLE IF NOT EXISTS clients (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR(50) NOT NULL,
    address     VARCHAR(100) NOT NULL,
    phone       VARCHAR(15)
  );`;
  
  db.run(sql_create_clients, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of the 'clients' table");
  });