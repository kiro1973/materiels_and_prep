
const { number } = require('joi');
const mongoose = require('mongoose');
//const app = express();
const multer = require("multer");
const path = require('path');

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));


const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    file:{
        type:String,
    }
});
module.exports = mongoose.model('Reports', userSchema);