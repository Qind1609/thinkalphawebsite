const crypto = require('crypto')
const genPassword = require('./passport').genPassword

function createUserPassword() {
    console.log("ham create user Password")
    var randomPassword = crypto.randomBytes(8).toString('hex');
    var saltHash = genPassword(randomPassword)
    return {
        randomPassword: randomPassword,
        salt: saltHash.salt,
        hash: saltHash.hash
      };
}

module.exports.createUserPassword = createUserPassword