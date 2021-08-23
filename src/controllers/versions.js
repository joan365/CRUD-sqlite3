const version = require('../../package.json').version;


const versions = {};

versions.llista = (req, res) => {
        res.render("versions",{ versio: version }); 
};

module.exports = versions;