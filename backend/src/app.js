const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const postgres = require('postgressql');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors)

//routes

//server
app.listen(port, () => {
    console.log('Server is running')
})