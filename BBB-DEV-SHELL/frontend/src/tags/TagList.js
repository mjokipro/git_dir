import React, { useState, useEffect } from "react";
import TagCard from "./TagCard"
import SearchForm from '../common/SearchForm'
import JoblyApi from '../api/api'
import {Link} from 'react-router-dom'

const TagList = ({search}) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
      console.debug("getTags=", tags)
      search()
  }, []);

  async function search(name){
    let tags = await JoblyApi.getAllTags(name)
    setTags(tags)
  }

  if (!tags) return <p>Loading...</p>

  return (
    <div className="container card">
        <SearchForm searchFor={search} />      
        {tags.length
          ? <TagCard tags={tags} />
          : <p className="lead">No Tag Results</p>
        }    
    {/* <Link to={`/tags`}>
        <button className="btn btn-secondary mb-2 sm">Back</button>
    </Link>     */}
    </div>
  );
};

export default TagList;