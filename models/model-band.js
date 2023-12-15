const mongoose = require('mongoose')

const {Schema} = mongoose

const SchemaBand = new Schema ({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    members:[{
        type:mongoose.Types.ObjectId,
        ref:'member'
    }]
},{
    versionKey: false
})


module.exports = mongoose.model('band', SchemaBand)