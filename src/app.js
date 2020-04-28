require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI,
    {useNewUrlParser:true,
    useUnifiedTopology:true
});


app.use(express.json());
app.use(routes);

module.exports = app;