import React from "react";
import {Link} from "react-router-dom"

const PostCard = ({  title, content, userId}) => {
console.debug("Post Card", title, content, userId)

  return (
   
        <div>
         <h1>Post Card</h1>
        {title}
        {content}
        {userId}
        </div>

  );
};

export default PostCard;