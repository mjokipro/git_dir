import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import JoblyApi from "../api/api";
import './TagDetail.css'

const TagDetail = ({  id, name, userId}) => {
  console.debug("Tag Detail", id, name, userId)
  const [tags, setTags] = useState();
  
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
    <div className="container">
    <ul>
      {tags.map(t => (
      <Link 
          key={t.id}
          to={`/tags/${t.id}`}> 
        <li
          key={t.id}
          value={t.name}
        >
          {t.name}
        </li>
      </Link> 
      ))}
    <Link to={`/posts`}>
        <button className="btn btn-secondary mb-2 sm">Back</button>
    </Link>
    </ul>
    </div>
  );
};

export default TagDetail;