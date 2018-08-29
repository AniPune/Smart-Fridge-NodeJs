const express = require('express');
var db = require('../database/cloudant.js');
var router = express.Router();
var bcrypt = require('bcrypt');

global.count = 0;

router.get('/',(req, res) => {
    res.render('login.hbs');

});

router.get('/login',(req,res)=>{
    res.render('login.hbs')
})

router.post('/login',(req, res) => {
    //console.log(count)
    var a = req.body.password;
    
        db.dbGET(req.body.username,a, function(id){
        
    if(u){
        //res.send(`Your sent the fields : UserName :${req.body.username} and Password: ${req.body.password}`);
        res.render('login1.hbs');
        //console.log('Logged In', ++count);
    }
    else {
        res.render('login.hbs');
        console.log('User doesnt exist')
    }
});
});



router.get('/404' ,(req , res) =>{
    res.render('errorHandler.hbs',{
        errorCode: 500,
        errorMessage: 'Oops! Something went wrong'
    });
});

module.exports = router;