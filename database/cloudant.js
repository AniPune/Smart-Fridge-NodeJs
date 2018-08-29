var Cloudant = require('@cloudant/cloudant');
const express = require('express');
var bcrypt = require('bcrypt');

var me = 'bed8ab04-3831-406b-9bf1-f70088698dbe-bluemix'; // Set this to your own account
var password = 'df000718c7b307bfa0a99b46fcb5a54b1a6ed5ddfd02eaf81745473676e47bbf';//process.env.cloudant_password;
var names = [];
global.flag = false;
global.u = false;
// Initialize the library with my account.
var cloudant = Cloudant({account:me, password:password});
var db = cloudant.db.use("test");

cloudant.db.list(function(err, allDbs) {
  console.log('All my databases: %s', allDbs.join(', '))
})



module.exports.dbGET = function  (usName,passwrd,callback){
  db.list({ include_docs: true }, function(err, docs) {
    if (!err) {
      u = false;
      docs.rows.forEach(function(row) {
        if(row.doc.UserName == usName){
          //names.push(row.doc.UserName);
          console.log("User Exists");
          u = bcrypt.compare(passwrd,row.doc.Password);
          callback(u);
          // if(row.doc.Password == passwrd){
          //   u =true;
          //   callback(u);
          // }
        }
      }   
    );
    if(u != true){
      callback(u);
    }
}
  });
}




module.exports.dbGET1 = function  (uName,password,callback){
  var Name = uName;
  var Passwrd = password;
  db.list({ include_docs: true }, function(err, docs) {
  if (!err) {
    flag = false;
    docs.rows.forEach(function(row) {
      if(row.doc.UserName == Name){
        //names.push(row.doc.UserName);
        console.log("User Exists");
        flag = true;
        callback(flag);
        
      }
      
    }
  
  );
  if(flag != true){
    db.insert({ UserName: Name, Password: Passwrd }, function(err, body) {
      if (err) {
        return console.log('[db.insert] ', err.message);
      }
      console.log('You have inserted the data.');
      console.log(body);
      //flag = false;
      callback(flag);
      });
  }
    //console.log(names);
  }
});

}