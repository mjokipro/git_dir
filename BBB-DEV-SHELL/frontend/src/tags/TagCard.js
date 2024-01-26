import React from "react";
import {Link} from "react-router-dom"

const TagCard = ({id, name}) => {

  return (
      <Link to={`/tags/${id}`}>
        {/* <h1>Tag Card</h1> */}
        <span>{name}</span>
      </Link>
  );
};

export default TagCard;