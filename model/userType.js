const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    userType:{
        type:String,
        default:"chef"
    }
});

module.exports = mongoose.model("userType", TypeSchema);
