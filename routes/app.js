const router = require('express').Router();
const User = require('../model/user');
const Materiel = require('../model/materiel');
const Preparation = require('../model/preparations');
const PrepDet = require('../model/preparation_details');
const express = require('express');
router.post('/preparations',async(req,res)=>{
    var materiels = [];
    console.log("req.body.materiels")
    console.log(req.body.materiels)
    for (let m of req.body.materiels){
        console.log("m:")
    console.log(m)
        
        const mat = await Materiel.find({ title: m.materiel.title}  )
        console.log("mat")
        console.log(mat)    //array of matching 
        if (m.quantity>mat[0].quantity){
            res.send("quantity is larger than available")
        }
        else{
            var q =mat[0].quantity-m.quantity
            console.log(q)
            const matObj= Materiel.findById(mat[0]._id)
            console.log("matObj ")
            console.log(matObj)

            materiels.push({materiel:mat[0]._id,quantity:q})
        }
        
    }
    console.log("materiels array")
    console.log(materiels)
    const prep_subject= req.body.subject
    const prep_meal= req.body.meal
    const prep_money= req.body.money
    const prepSchema={subject:prep_subject,
    meal:prep_meal,
    materiels:materiels,
    money:prep_money
}

    console.log("prepSchema")
    console.log(prepSchema)
    const preparation = new PrepDet();
    preparation.subject=req.body.subject
    preparation.meal=req.body.meal
    preparation.money=req.body.money
    preparation.materiels=materiels
    const x=await preparation.save();
    console.log(x)
    res.send("pending")

});
router.get('/materiels',async(req,res)=>{
    const allMateriels= await Materiel.find({})
    console.log(allMateriels)
    res.send(allMateriels)
})
router.get('/h',(req,res)=>{
    res.send("you are in api/prep")
})
module.exports = router;