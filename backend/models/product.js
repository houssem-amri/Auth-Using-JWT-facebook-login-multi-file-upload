const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    nom: String,
    categorie: String,
    prix: String,
    description: String,
    image: String
});
const product = mongoose.model('Product', productSchema);
module.exports = product;