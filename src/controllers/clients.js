//Creem el nostre objecte controlador per gestionr clients
//Amb les funcions que necessitem per respondre a les rutes definides
const version = require('../../package.json').version;
const sqlite3 = require("sqlite3").verbose();
const path = require('path'); //concatena directoris
process.env["NODE_CONFIG_DIR"] = __dirname + "/../configuracions/";
const config = require('config');

//Accés a la B.D.
const db_name = path.join(__dirname, "../../database", config.get('db.arxiu'));
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database: ", config.get('db.arxiu'));
});

const clients = {};

clients.llista = (req, res) => {
    //res.send("Hola això es la llista de clients");
    var sql = "SELECT * FROM clients";
    db.all(sql, [], (err, rows) => {
        if (err) console.log("ERROR selecció: ", err);
        res.render("clients",{ data: rows, versio: version });
    });
};

clients.save = (req, res) => {
    const data = req.body;
    console.log("Dades rebudes: ", data);
    var sql_insert = "INSERT INTO clients \
    (name, address, phone) \
    VALUES ( '" + data.name +"','"+ data.address + "','" + data.phone +"') \
    ";
    console.log("La query: ", sql_insert);
    
    db.run(sql_insert, err => {
        if (err) console.log("ERROR ALTA: ", err);        
    });
    res.redirect('/');
};

clients.delete = (req, res) => {
    const {id} = req.params;
    console.log("Id a eliminar: ", id);
    const sql = "DELETE FROM clients WHERE id=?";
    db.run(sql, [id], err => {
        if (err) console.log("ERROR BAIXA: ", err);
    });
    res.redirect('/'); 
};

clients.edit = (req, res) => {
    const { id } = req.params;
    console.log("Id a modificar: ", id);
    const sql = "SELECT * FROM clients WHERE id = ?";
    db.get(sql, [id], (err, row) => {
        if (err){
            console.log("ERROR selecció id: " + id + "  ", err);
            res.redirect('/');
        } 
        console.log("Dades a modificar: ", row.name);
        res.render("client_edit",{ data: row, versio: version  });
    });
};


clients.update = (req, res) => {
    const { id } = req.params;
    console.log("Id a modificar: ", id);

    const data = [req.body.name, req.body.address, req.body.phone, id];
    console.log("Dades per la modificació: ", data);

    const sql = "UPDATE clients SET name=?, address=?, phone=? WHERE id=? ";
    console.log("SQL: ", sql);

    db.run(sql, data, (err) => {
        if (err) console.log("ERROR modificació id: " + id + "  ", err);
    });
    res.redirect('/'); 
};


module.exports = clients;