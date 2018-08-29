const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');
//const db = require('./database/cloudant.js');

var indexrouter = require('./routes/indexRouter');
var signUpRouter = require('./routes/signUp');
var userRegistrationRouter = require('./routes/userRegistrationRouter')
const port = process.env.PORT || 9898;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper("title", function(obj) {
    return !obj;
  });
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); //rendering static files
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if (err){
            console.log('Unable to append to server.log.')
        }
    });
    next();
});

app.listen(port ,() =>{
    console.log(`Server started on port: ${port}`);
});

app.use('/',indexrouter);
app.use('/join',signUpRouter);
app.use('/register',userRegistrationRouter);

app.use((req, res, next) =>{
    res.status(404);
    res.format({
        html:() =>{
            res.render('errorHandler.hbs',{
                errorCode: 404,
                errorMessage: 'Page not found'
            });
        },
        json:() =>{
           res.json({error : 'Not found'});
        },
        default: () =>{
            res.render('errorHandler.hbs',{
                errorCode: 404,
                errorMessage: 'Page not found'
            });
        }
    })
});


module.exports= app;
