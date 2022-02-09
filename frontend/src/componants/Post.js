import React, {useState}from 'react';


export default function PostComment(props) {

    const [newComment,setnewComment] = useState('')

    const createNewComment=()=>{
        console.log("createNewComment")
        props.createCom({comment:newComment})
    }
    return(
    <div>
       
            <label htmlFor="MainLabel" className="MainLabel"> Get in touch </label>
           
            <input type="name" name="name" id="name" placeholder="Name" />
            <input  type="Email" name="Email" id="Email"placeholder="Email"/>
            <input type="message" name="message" id="message"/> 
             
            <button className="SendBtn" onClick={createNewComment}> Send comment</button>
            <input className="ResetBtn" type="submit" value="Reset"/>
        
</div>
    )
}   