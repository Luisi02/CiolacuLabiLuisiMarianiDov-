const fs = require('fs');
const mysql = require('mysql2');
const { isNativeError } = require('util/types');
let conf = JSON.parse(fs.readFileSync('public/conf.json'));
conf.ssl = {
    ca: fs.readFileSync(__dirname + '/ca.pem')
}
const connection = mysql.createConnection(conf);


const executeQuery = (sql) => {
   return new Promise((resolve, reject) => {      
         connection.query(sql, function (err, result) {
            if (err) {
               console.error(err);
               reject();     
            }   
            console.log('done');
            resolve(result);         
      });
   })
}

const database = {

   //QUERY
   //Lista professori

   //Lista classi

   //Aula prof

   //Orario prof

   //Orario classe

   //Aula classe



}

module.exports = database;