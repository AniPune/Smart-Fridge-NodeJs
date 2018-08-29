const express = require('express');
var db = require('../database/cloudant.js');
var bcrypt = require('bcrypt');
var router = express.Router();

router.get('/signUp' ,(req , res) =>{
    res.render('registerUser.hbs');
});

router.post('/signUp', function(req, res){
    //do something
    var a = req.body.password;
    bcrypt.hash(a, 10, function(err, hash) {
        console.log(hash);
        db.dbGET1(req.body.username,hash,function(id){
     
            if(flag){
                console.log("User Exists");
                res.redirect('/join/signUp');
            } 
            else{
                console.log("Data inserted");
                res.redirect('/register/register'); 
            }
        });
      });
    
});

module.exports = router;