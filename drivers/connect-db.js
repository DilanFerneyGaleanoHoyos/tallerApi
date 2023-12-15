const mongoose = require('mongoose');

const URI = "mongodb+srv://dilangaleano:dilan05@cluster0.5gsaf2i.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', false)

mongoose.connect(URI)
    .then(()=>console.log('Connect DB Success'))
    .catch(e=>console.log(e))

module.exports=mongoose