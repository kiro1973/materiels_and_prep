const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSchema = new Schema({
    subject:{
        type:String
    },
    meal:{
        type:String
    },
    materiels: 
        [
        {
            materiel: {
                type: Schema.Types.ObjectId,
                ref: 'materiel',
                required: true
            },
            quantity: { 
                type: Number,
                required: true }
        }
    ]
,
    money: Number,

});
module.exports = mongoose.model("Preparation_Details", detailSchema)