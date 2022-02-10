import './App.css';
import axios from 'axios';
import React, {useState} from 'react';
import Review from './componants/Review';
import PostComment from './componants/Post';

export default function App() {

const [comments, setComments] = useState([]);

const getData= () => {
  // this function should bring data using axios from the URI I attached
   // in connection to the get (find{})  function in server.js
   axios
   .get('http://localhost:2222/comment')
   .then((response)=>{
     console.log("Data", response.data);
     setComments(response.data)
    })
    .catch((err)=>{
      console.log('ERR:', err);
    });
  };
  

const PostNewComment= (body) => {
  // this function should post data using axios from the URI I attached .. passed this to tag PostComment 
  // body here is what we were write in postman to post new info .. 
  // like this => {"title":"taskName", "isComleted":false}
  // this function connect to the post function in server.js
  axios
  .post('http://localhost:2222/comment',body)
  .then((response)=>{
    console.log("Data is posted", response.data);
    getData()
      // to show it on the UI , req get again here
    })
    .catch((err)=>{
    console.log('ERR:', err);
  });
};


const mapOverReview = comments.map((commentObj, i)=>
// this map should take the received data and passed them each
    //time to serprated componants
      <Review
      key={commentObj._id}
      comments={commentObj}/>)
  return (
    <div className="App">
     <PostComment createCom={PostNewComment}/>
     <div className="commentBox"> {mapOverReview}</div>
     <button onClick= {getData}>Get comment</button>

    </div>
  );
}


