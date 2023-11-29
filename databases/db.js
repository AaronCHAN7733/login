const mysql = require('mysql');

const conection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_ROOT,
    password: process.env.DB_PASWORD,
    database: process.env.DB_DATABASE
})

conection.connect((error) =>{
if (error){
    console.error("error de" + error);
}
else {
    console.log("successful conection");
}

})

module.exports = conection;