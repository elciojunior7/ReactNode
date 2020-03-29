const crypto = require("crypto");

module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX'); //gera ID randomico de 4 bytes convertido para HEXadecimal
}