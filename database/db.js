const axios = require('axios');
var config = {
    headers: {'Authorization':/*----Cloudant DB*/'Basic YmVkOGFiMDQtMzgzMS00MDZiLTliZjEtZjcwMDg4Njk4ZGJlLWJsdWVtaXg6ZGYwMDA3MThjN2IzMDdiZmEwYTk5YjQ2ZmNiNWE1NGIxYTZlZDVkZGZkMDJlYWY4MTc0NTQ3MzY3NmU0N2JiZg=='                  
             }
};
var url = 'https://bed8ab04-3831-406b-9bf1-f70088698dbe-bluemix:df000718c7b307bfa0a99b46fcb5a54b1a6ed5ddfd02eaf81745473676e47bbf@bed8ab04-3831-406b-9bf1-f70088698dbe-bluemix.cloudant.com/test'

var urlGet = 'https://bed8ab04-3831-406b-9bf1-f70088698dbe-bluemix:df000718c7b307bfa0a99b46fcb5a54b1a6ed5ddfd02eaf81745473676e47bbf@bed8ab04-3831-406b-9bf1-f70088698dbe-bluemix.cloudant.com/test/_all_docs?include_docs=true'

module.exports.dbPOST = function (uName, passwrd){
    var data = {
        UserName: uName,
        Password: passwrd
    };
axios.post(url , data, config)
    .then(response => {
    console.log(response.data);
    })
  .catch(error => {
      console.log(error);
  });
}

module.exports.dbGET = function (){
    axios.get(urlGet,config)
        .then(response=>{
            var a = JSON.stringify(response.data);
            console.log(a);
        })
    .catch(error =>{
        console.log(error);
    })
}