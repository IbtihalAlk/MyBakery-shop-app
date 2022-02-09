const { Schema, model }= require("mongoose");


const commentSchema = new Schema({
    email: {type:String,required: true, },
    name:{type:String,required: true},
    comment:String
});

//model
const comment= model("",commentSchema);

//export Model

module.exports = comment;