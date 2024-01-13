import React from "react";
import {useParams} from 'react-router-dom';

function Post() {
  const {slug} = useParams();
  return (
    <div>
      <h1>Here's our blog post.</h1>
      <p>Topic: {slug}</p>
      <p>Content: TBD.</p>
    </div>
  );
}

export default Post;
