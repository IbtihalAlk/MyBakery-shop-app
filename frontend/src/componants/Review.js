import React , {useState}from 'react'

export default function Review(props) {
    const {comments}=props.comments;
  return (
    <div>
      <input className="Reviews" type="Text">{comments}</input>
    </div>
  )
}
