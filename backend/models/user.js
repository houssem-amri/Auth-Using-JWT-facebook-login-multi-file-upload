const mongoose = require('mongoose');
const mongooseValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    userName: String,
    email: { type: String, required: true, unique: true },
    pwd: String,
    role: String
});
userSchema.plugin(mongooseValidator);
const user = mongoose.model('User', userSchema);
module.exports = user;