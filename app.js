//
const express = require('express');
const app = express();

//permite capturar los datos de nuestro formulario media urlncoded
app.use(express.urlencoded({extended:false}))
app.use(express.json());

//invocar o importar doten
const dotenv = require('dotenv');
dotenv.config({path: './env/.env'});

//directorio public
app.use('/', express.static('public'));
app.use('/', express.static(__dirname + '/public'));

//establecer motor de platillas ejs
app.set('view engine', 'ejs');

//invocar el bcrypt
const bcryptjs = require('bcryptjs');

//variables de sesion
const session = require('express-session');
app.use(session ({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
})) 

//invocar el modulo de conexion de nuestra bd
const connection = require('./databases/db')

/*app.get('/', (req, res)=>{
    res.send('hello world');
})*/
app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/login', (req, res)=>{
    res.render('login');
})

app.get('/register', (req, res)=>{
    res.render('register');
})

//register
app.post ('/register', async(req, res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8);
    connection.query ('INSERT INTO login SET ?', {
        user:user, name:name, rol:rol, pass:passwordHash
    }, async(error, result)=>{
        if(error){
            console.log(error);
        }else{
            res.send('successful resgistration')
        }
    })
})

app.listen(3000, (req, res)=>{
    console.log('server running on https://localhost:3000/');
})