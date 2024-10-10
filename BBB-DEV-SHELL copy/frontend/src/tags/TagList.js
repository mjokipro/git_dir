import React, { useState, useEffect } from "react";
import TagCard from "./TagCard"
import SearchForm from '../common/SearchForm'
import JoblyApi from '../api/api'

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
    <div>
        <h1>Tag List</h1>
        <SearchForm searchFor={search} />
        
        {tags.length
          ? <TagCard tags={tags} />
          : <p>No Tag Results</p>
          }
          
    </div>
  );
};

export default TagList;