const express = require('express');
var router = express.Router();


router.get('/register',(req, res) => {
    res.render('registerUserOk.hbs');

});


module.exports = router;