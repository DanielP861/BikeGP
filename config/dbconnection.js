const mongoose = require('mongoose')
require('dotenv').config({ path: './private/.env' })

mongoose.connect(
    process.env.URI, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("Connected to MongoDB")
);