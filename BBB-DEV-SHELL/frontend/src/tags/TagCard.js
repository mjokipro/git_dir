import React from "react";
import {Link} from "react-router-dom"
import TagDetail from "./TagDetail";
import Tag from "./Tag";

const TagCard = ({tags}) => {
console.debug("TagCardList", "Tags=", tags)

  return (
<div>

    {tags.map(t => (
      <Tag 
        key={t.id} 
        id={t.id} 
        name={t.name}
        />
    ))}

    <TagDetail 
        key={tags.id}
        id={tags.id}
        name={tags.name}
      />

    {/* {tags.map(t => (
      <TagDetail 
        key={t.id}
        id={t.id}
        name={t.name}
      />
    ))} */}
  </div>
  )

};

export default TagCard;