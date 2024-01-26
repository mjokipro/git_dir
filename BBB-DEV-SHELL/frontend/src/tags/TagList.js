import React, { useState, useEffect } from "react";
import TagCard from "./TagCard"
import SearchForm from '../common/SearchForm'
import useFetch from '../hooks/useFetch'
import JoblyApi from '../api/api'

const TagList = ({search}) => {
  const [tags, setTags] = useState(null);


  useEffect(() => {
      console.debug("getTags=", tags)
      search()
  }, []);

  async function search(){
    let tags = await JoblyApi.getAllTags()
    setTags(tags)
  }

  if (!tags) return <p>Loading...</p>

  return (
    <div>
        <h1>Message Card List</h1>
        <SearchForm searchFor={search} />
        
        <ul>
        {tags.map(t => (
          <li>
          <TagCard 
            key={t.id}
            id={t.id}
            name={t.name}
            value={t.name} />
          </li>
          ))}
        </ul>
    </div>
  );
};

export default TagList;