import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import JoblyApi from "../api/api";


const PostCard = ({ id, title, content, userId}) => {
console.debug("Post Card", title, content, userId)

const [tags, setTags] = useState()

useEffect(function getTags(){
  console.debug("Get tags for post", tags)
  search()
}, []);

async function search(id){
  let tags = await JoblyApi.getTagsPost(id)
  setTags(tags)
}


// useEffect(){
//   async function getTags(){
//     setTags(await JoblyApi.getTagsPost(id))
//     getTags()
//   }, []
// }

  return (
   
    <Link to={`/posts/${id}`}>
        <div >
        <p>{title}</p>
        <p>{content}</p>
        <p>{userId}</p>
        </div>
        </Link>
  );
};

export default PostCard;