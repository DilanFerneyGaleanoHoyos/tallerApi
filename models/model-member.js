const mongoose = require('mongoose')

const {Schema} = mongoose

const SchemaMember = new Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    band:{
        type:mongoose.Types.ObjectId,
        ref:'band'
    }
},{
    versionKey: false
})

module.exports = mongoose.model('member', SchemaMember)