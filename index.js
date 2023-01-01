if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUI = require("swagger-ui-express");
const Report = require('./model/reports');

const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("./api.yaml");

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));





//Import Routes
const authRoute = require('./routes/auth');
const appRoute = require('./routes/app');

dotenv.config();

// connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('connected to db')
);

//Middlewares
app.use(express.json());

//Route MiddleWare


/**
 * @swagger
 * /register:
 * post:
 * description:Used to register new customer
 * responses:
 * '200':
 * description:user registered succesfully
 * 
 */








// server.js

const multer = require("multer");
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
}
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);

    }
});

var upload = multer({ storage: storage }).single('file');


app.post('/upload_files', async (req, res) => {


    upload(req, res,async  function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log(req.body)
            console.log(req.file.originalname)
            var name = req.body.name;
            var file = req.file.originalname;
            var report={name:name,file:file};
            const newFile = new Report(report);
            await newFile.save();
            console.log(newFile)
            //var FileName = req.files.filename;
            //res.status(200).send(FileName);
        }
    })
});
app.get("/download", (req, res) => {
    res.sendFile('Agile Assignment sol.pdf', { root: path.join(__dirname, '/uploads') });
    //res.sendFile("./uploads/85ee1738139d44bcb1828833a9a16ece")
})











app.use('/api/user', authRoute)
app.use('/api/prep', appRoute)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on Port ${port}`)
})