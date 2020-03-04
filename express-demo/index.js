const express = require('express');
const app = express();
const Joi = require('joi');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//import routes
const authRoutes = require('./routes/auth');


dotenv.config();

//connect mongodb
mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true }, () => {
    console.log('Connected to mongoDB');
});

//Middlewares
app.use(express.json());

//Route middlewares
app.use('/api', authRoutes);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));