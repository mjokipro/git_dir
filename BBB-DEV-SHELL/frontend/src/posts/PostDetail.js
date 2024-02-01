import React, { useState, useEffect} from "react";
// import PostCard from "./PostCard"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import JoblyApi from "../api/api";
// import TagCard from "../tags/TagCard";
import TagDetail from "../tags/TagDetail";
import NewMessageForm from "./NewMessageForm"


const PostDetail = () => {
  const [post, setPost] = useState(null);
  // const [tags, setTags] = useState(null)

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
    <div className="form-gr" >
    <h1>Post</h1>
    
    <h4>{post.title}</h4>
    <p>{post.content}</p>
      <NewMessageForm />
      <TagDetail tags={post.tags} id={post.id}/>
    </div>
  );
};

export default PostDetail;