const express = require("express");
const app = express();
const cors=require("cors")
const db = require("./db");
const comment= require("./models/comment");


app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {
  // this function to check if the server is working
  res.json("GET/ is Working");
});

app.get("/comment", (req, res) => {
  // this function use to return the whole comments to the browser 
  comment.find({}, (err, data) => {
    if (err) {
      console.log("ERROR");
     }else{
       res.status(200).json(data);
      }
    })
});

// app.get("/filter", (req, res) => {
//   // this function use to return the completed ot the uncompleted tasks
//   comment.find({comment: req.query.comment}, (err, data) => {
//     //           the condtion     ,                  the callback
//       if (err) {
//           console.log("ERROR",err);
//       }else{
//           res.status(200).json(data);
//       }
//   })
// });

app.post("/comment", (req, res) => {
  // this function use to add a new task
  console.log('25:',req.body);
  comment.create(req.body, (err, newComment) => {
    if (err) {
      console.log("ERORR", err);
    } else {
      // if saved:
      res.status(201).json(newComment);
      console.log("Post comment succssfully")
    }
  });
});

app.delete("/comment/:id", (req, res) => {
  // this function uses to delete the selected comment (only one)
  comment.deleteOne({ _id: req.params.id}, (err, deleteObj) => {
    if (err) {
      console.log("ERROR", err);
      res.status(500).json("there is a problem in DB");
    } else {
      deleteObj.deletedCount === 1
        ? res.json("Success Delete " + req.params.id)
        :res.status(404).json("This comment is not FOUND");
    }
  });
});

// to update or edit element in your data 
app.put("/comment/:id", (req, res) => {
  comment.updateOne(
    { _id: req.params.id},
    { comment: req.body.newComment},
    (err, updateObj) => {
      if (err) {
        console.log("ERROR:", err);
        res.status(500).json("there is a problem in DB");
      } else {
        updateObj.modifiedCount === 1
          ? res.status(200).json("Success Update one comment")
          : res.status(404).json(" this comment is  Not Found");
      }
    }
  );
});



app.listen(2222, () => {
    console.log("server 2222 is working...");
}); 