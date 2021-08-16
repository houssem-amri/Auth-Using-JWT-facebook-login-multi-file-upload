
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userFbSchema = new Schema({
    uid: String,
    token: String,
    email: String,
    name: String,
    gender: String,
    pic: String
});

const UserFb = mongoose.model('userFb', userFbSchema)

module.exports = UserFb