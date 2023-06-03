const { readdirSync } = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv').config();

const app = express();


//Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(cors())



//Router middleware
readdirSync('./src/routes').map((routeFile) =>  app.use('/api/v1', require(`./src/routes/${routeFile}`)));


//404 error handle
app.use((req,res, next)=> {
    res.status(404).json({message: '4💕4 Not Found'})
})


//error handle
// app.use(errorHandling);

const port = process.env.PORT || 8000;
const database = process.env.DATABASE;


mongoose.connect(database)
.then(()=> {
	app.listen(port, ()=> {
		console.log(`Server Run Successfully at http://localhost:${port}`);
	})
}).catch(error => {
    console.log(error.message)
})