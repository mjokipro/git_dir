import React, { useState, useEffect } from "react";
// import Tag from "./Tag"
// import NewMessageForm from '../forms/NewMessageForm'
import {Link} from 'react-router-dom'
import JoblyApi from "../api/api";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import { post } from "../../../backend/routes/posts";
import './TagDetail.css'


const TagDetail = ({ id, name, userId}) => {
  console.debug("Tag Detail", id, name, userId)
  const [tags, setTags] = useState();
  // const {id} = useParams()
  
  useEffect(function getStuff() {
    async function getPost(){
      const tags = await JoblyApi.getAllTags(name)
      setTags(tags)
    }
    
    getPost()
  }, []);
  
  console.debug("Tags", tags)
if (!tags) return <p>Loading...</p>

  return (
    <select>
      {tags.map(t => (
        <option>
      {/* <Link to={`/tags/${t.id}`}> */}
        {t.name}
      {/* </Link> */}
      </option>
      
      ))}
    </select>
  );
};

export default TagDetail;