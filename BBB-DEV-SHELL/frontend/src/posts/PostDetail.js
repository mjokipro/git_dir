import React, { useState, useEffect} from "react";
import { useParams, Link, useHistory } from "react-router-dom"
import JoblyApi from "../api/api";
import TagDetail from "../tags/TagDetail";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const {id} = useParams()
  const history = useHistory()

  console.debug("PostDetail params=", id)
  useEffect(function getPostAndTags(){
      async function getPost(){
        setPost(await JoblyApi.getPost(id))
      }
      getPost()
}, [id]);

// async function editP(){
//   const post = await JoblyApi.editPost(id)
//   setPost(post)
//   history.push(`/posts/${id}`)
// }

async function removeP(){
  const post = await JoblyApi.removePost(id)
  setPost(post)
  history.push("/posts")
}

if (!post) return <p>Loading...</p>

  return (
    <div className="container card mt-3" >
    
    <h4>{post.title}</h4>
    <p className="lead">{post.content}</p>
      <TagDetail  tags={post.tags} id={post.id}/>
      <div>
    <Link to={"/posts"}>
      <button className="btn btn-secondary small mb-2">Back</button>
    </Link>
     {/* <button onClick={() => editP()} className='btn ml-2 mb-2 btn-primary'>Edit</button> */}
     <button onClick={() => removeP()} className='btn ml-2 mb-2 btn-danger'>Delete</button>
      </div>
    </div>
  );
};

export default PostDetail;