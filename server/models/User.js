var mongoose = require('mongoose');
// var crypto = require('crypto');

var shema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    avatar: String,
    google: {
        id: String,
        token: String
    }

});

// shema.setters = {
//     password: function(password) {
//         this._password = password;
//         this.salt = this.makeSalt();
//         this.hashed_password = this.encryptPassword(password);
//     }
// }
// shema.methods = {
//     encryptPassword: function(password) {
//         return crypto.createHmac('sha1', thi.salt).update(password).digest('hex';)
//     },
//     authenticate: function(plainText) {
//         return this.encryptPassword(plainText) === this.hashed_password;
//     },
//     makeSalt: function() {
//         return Math.round((new Date().valueOf() * Math.random())).toString();
//     }
// }

var Model = mongoose.model('User', shema);

module.exports = Model;