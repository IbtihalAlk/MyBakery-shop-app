const { Schema, model }= require("mongoose");


const commentSchema = new Schema({
    email:{type:String },
    name:{type:String},
    comment:String
});

//model
const comment= model("",commentSchema);

//export Model

module.exports = comment;