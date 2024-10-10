import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import JoblyApi from "../api/api";

const PostCard = ({ id, title, content, userId}) => {
console.debug("Post Card", title, content, userId)

const [post, setPost] = useState(null)

useEffect(function postPost(){
  addP()
}, [post]);

async function addP(data){
  let post = await JoblyApi.addPost(data)
  console.log(post)
  setPost(post)
}

  return (
    <div >
        <Link to={`/posts/${id}`}>
        <p className="lead">{title}</p>
        </Link>
        <p className="lead">{content}</p>
        <p className="lead">{userId}</p>
    </div>
  );
};

export default PostCard;