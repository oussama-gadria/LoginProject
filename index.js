const express = require('express');
const app = express();
const UserRouter=require('../LoginProject/api/User'); 
const http=require("http");
require('dotenv').config();
require('./config/db');

//Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
})
//conf json 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/user',UserRouter)

//Creation d'un Serveur
const server = http.createServer(app); 
server.listen(3000,()=>{ 
  console.log("app is running on port 3000");

})