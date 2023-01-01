const mongoose = require('mongoose');
const materiel = require('./materialseeds');
const Materiel = require('../model/materiel');
const prepa = require('../model/preparations');
const prepDet = require('../model/preparation_details');
const express = require('express');
const app = express();




mongoose.connect('mongodb+srv://kika:kika@cluster0.ipxyhpp.mongodb.net/test', {
  useNewUrlParser: true,

  useUnifiedTopology: true,
  //useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database conncted")
});


const seedDB = async () => {
  // await Materiel.deleteMany({});
  // for (let i = 0; i < 25; i++) {

  //   const mats = new Materiel({
      
      
  //     title: materiel[i].title,
  //     imageUrl:materiel[i].imageUrl ,
  //     quantity: materiel[i].quantity

  //   })
  //   await mats.save();
  // }
  
    const materialinprep=await Materiel.find({ title: 'mini speaker'}  )
  
  console.log(materialinprep)

  
  //await prepDet.deleteMany({});
  const prepsDet=new prepDet({
    subject:"new year 2",
    meal:"koshari",
    materiels: [{
      materiel:  materialinprep[0]._id
      ,
      quantity:5
          
      
    }],
    money:10

  })
await prepsDet.save();

console.log("prepsDet")
console.log(prepsDet)
const preparation_details = await prepDet.findById(prepsDet._id).populate('materiels.materiel');
console.log(preparation_details)

}
seedDB().then(() => {
 // mongoose.connection.close();
});
app.get('/',async (req,res)=>{
  console.log("getting//////////////////")
  //var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
  const k =await prepDet.find({subject:"new year 2"}).populate('materiels.materiel');
  console.log("K:|||||||||||||||||")
  console.log(k)
  res.send(k)
})

app.listen(3000, () => {
  console.log(`Serving on Port 3000`)
})