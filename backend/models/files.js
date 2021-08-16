const mongoose = require('mongoose');
const fileSchema = mongoose.Schema({
    file: String,

});
const file = mongoose.model('File', fileSchema);
module.exports = file;