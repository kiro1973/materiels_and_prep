const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preparationSchema = new Schema({
    preparation_details: {
        type: Schema.Types.ObjectId,
        ref: 'Preparation_Details'
    },
    chef: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    state:String
});

module.exports = mongoose.model("preparation", preparationSchema);

