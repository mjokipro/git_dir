import React, { useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom"
import JoblyApi from "../api/api";
import TagDetail from "../tags/TagDetail";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const {id} = useParams()

  console.debug("PostDetail params=", id)
  useEffect(function getPostAndTags(){
      async function getPost(){
        setPost(await JoblyApi.getPost(id))
      }
      getPost()
}, [id]);

if (!post) return <p>Loading...</p>

  return (
    <div className="container card mt-3" >
    
    <h4>{post.title}</h4>
    <p className="lead">{post.content}</p>
      <TagDetail  tags={post.tags} id={post.id}/>
    {/* <Link to={"/posts"}>
      <button className="btn btn-secondary small mb-3">Back</button>
    </Link> */}
    </div>
  );
};

export default PostDetail;