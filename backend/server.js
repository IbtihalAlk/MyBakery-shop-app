const express = require("express");
const app = express();
// const cors=require("cors")
const db = require("./db");


app.use(express.json())
// app.use(cors());

app.get("/", (req, res) => {
  // this function to check if the server is working
  res.json("GET/ is Working");
});


// CRUD operations: Create, Read,Update,Delete 
//  this is the 4 basic backEnd requests to learn as a progrmmer
app.get("/tasks", (req, res) => {
  // this function use to return the whole tasks 
  Todo.find({}, (err, data) => {
    if (err) {
      console.log("ERROR");
     }else{
       res.status(200).json(data);
      }
    })
});

app.post("/tasks", (req, res) => {
  // this function use to add a new task
  console.log('25:',req.body);
  Todo.create(req.body, (err, newTask) => {
    if (err) {
      console.log("ERORR", err);
    } else {
      // if saved:
      res.status(201).json(newTask);
    }
  });
});

app.delete("/tasks/:id", (req, res) => {
  // this function uses to delete the selected task (only one)
  Todo.deleteOne({ _id: req.params.id}, (err, deleteObj) => {
    if (err) {
      console.log("ERROR", err);
      res.status(500).json("there is a problem in DB");
    } else {
      deleteObj.deletedCount === 1
        ? res.json("Success Delete " + req.params.id)
        :res.status(404).json("This to-do task is not FOUND");
    }
  });
});

// to update or edit element in your data 
app.put("/tasks/:id", (req, res) => {
  Todo.updateOne(
    { _id: req.params.id},
    { title: req.body.newTitle },
    (err, updateObj) => {
      if (err) {
        console.log("ERROR:", err);
        res.status(500).json("there is a problem in DB");
      } else {
        updateObj.modifiedCount === 1
          ? res.status(200).json("Success Update one to-do task")
          : res.status(404).json(" this to-do is  Not Found");
      }
    }
  );
});



// use filter querry to minimise codes

//               ? key=value & key=value
app.get("/filter", (req, res) => {
  // this function use to return the completed ot the uncompleted tasks
  Todo.find({isCompleted: req.query.isCompleted}, (err, data) => {
    //           the condtion     ,                  the callback
      if (err) {
          console.log("ERROR",err);
      }else{
          res.status(200).json(data);
      }
  })
});

// the up endpint is repleace these two

// to filter the data and return only the colpleted todo task. 

// app.get("/Completed", (req, res) => {
  
//   Todo.find({isCompleted:true }, (err, data) => {
//     //        the condtion     ,    the callback
//       if (err) {
//           console.log("ERROR",err);
//       }else{
//           res.status(200).json(data);
//       }
//   })
// });



// app.get("/uncompleted", (req, res) => {
//   Todo.find({isCompleted:false }, (err, data) => {
//     //        the condtion     ,    the callback
//       if (err) {
//           console.log("ERROR",err);
//       }else{
//           res.status(200).json(data);
//       }
//   })
// });



app.delete("/tasks", (req, res) => {
  // this function use to delete the completed tasks
  Todo.deleteMany({isCompleted: true}, (err, deleteObj) => {
    //           the condtion     ,                  the callback
      if (err) {
          console.log("ERROR",err);
      }else{
        console.log(deleteObj);
        deleteObj.deletedCount === 0
        ? res.json(404).json(" There is not any uncompleted task")
        :res.json("Delete all the completed tasks succssfully");
    }
  });
});


app.put("/tasks/:id/:isCompleted", (req, res) => {
  // this function uses to update the status of the task completed or not (checkbox)
  Todo.updateOne(
    {_id: req.params.id},
    {isCompleted:req.params.isCompleted},
    (err, updateObj) => {
      if (err) {
        console.log("ERROR:", err);
        res.status(400).json("there is a problem in DB");
      } else {
        console.log(updateObj)
        updateObj.modifiedCount === 1
          ? res.status(200).json("Update one to-do task Successfully ")
          : res.status(404).json(" this to-do task is  Not Found");
      }
    }
  );
});


// register& login page backend


app.post("/users/register", (req, res) => {
  // this function create a new user
  console.log(req.body);
  User.create(req.body, (err, newUser) => {
    if (err) {
      // console.log("ERORR", err);
      res.status(400).json({message:"this email is already taken"});
    } else {
      // if saved:
      res.status(201).json({
        message:"create a new user successfully"});
    }
  });
});


app.post("/users/login", (req, res) => {
  //this function check if the userInfo is correct when they post it
  User.find({email:req.body.email}, (err, arrUserFound) => {
    if (err) {
      console.log("ERROR",err);
     }else{
       console.log(arrUserFound)
       if(arrUserFound.length === 1){
         // this means we found the user 
         if(req.body.password === arrUserFound[0].password){
          //  password correct
         res.status(200).json({
           message:"Login succsfully",
           username:arrUserFound[0].username
          });
       }else{
        //  password incorrect 
        res.status(400).json({
          message:" wrong password"})
       }
       }else{
         res.status(404).json({
            message:"the email entered is not registered"
          });
        }
      }
    })
})
   






app.listen(6000, () => {
    console.log("server 5000 is working...");
}); 