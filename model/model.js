const mongoose = require('mongoose');

const {connectDB} = require('../db/db');
connectDB();

const Schema = mongoose.Schema;

const fileSchema=new Schema({
    originalUrl:
    {
        type:String,
        required:true
    },
    newUrl:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true
    }
})

const model=mongoose.model('linkShortner',fileSchema)

module.exports={model}; 