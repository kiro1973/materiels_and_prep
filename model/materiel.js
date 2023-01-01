const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materielSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    quantity: Number

});
module.exports = mongoose.model("materiel", materielSchema)