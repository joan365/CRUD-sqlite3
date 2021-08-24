const taula = {};

taula.clients= () => { 
    return `CREATE TABLE IF NOT EXISTS clients (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR(50) NOT NULL,
    address     VARCHAR(100) NOT NULL,
    phone       VARCHAR(15)
    );`;
};

module.exports = taula;