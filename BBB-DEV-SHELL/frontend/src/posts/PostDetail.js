import React, { useState, useEffect } from "react";
import PostCard from "./PostCard"

const PostDetail = () => {
  const [count, setCount] = useState(0);

  
  useEffect(() => {
      
}, []);

  return (
    <div>
    <h1>Post Card</h1>
      <PostCard />
    </div>
  );
};

export default PostDetail;