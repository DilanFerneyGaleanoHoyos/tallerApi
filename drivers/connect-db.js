const mongoose = require('mongoose')

const URI = "mongodb+srv://marco:marco05@cluster0.nbhtz7f.mongodb.net/?retryWrites=true&w=majority"

mongoose.set('strictQuery', false)

mongoose.connect(URI)
    .then(()=>console.log('Connect DB Success'))
    .catch(e=>console.log(e))

module.exports=mongoose