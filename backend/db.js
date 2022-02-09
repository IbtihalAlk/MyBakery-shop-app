const mongoose =require('mongoose');
const dbURI= "mongodb://localhost:27017/BakeryShop001";


const db= mongoose.connection

mongoose.connect(dbURI,()=>{
    console.log("the connection established...");
})

// extra Error, success

db.on('error',(err) =>{
    console.log("ERROR CONNECT MongoDB");
});

db.on('connected',()=>{
    console.log("MongoDB IS CONNECTED... ");
});