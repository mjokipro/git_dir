import React from "react";
import { Link } from "react-router-dom";

import "./WebsiteCard.css";

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function WebsiteCard({ id, user_id, description, web_url }) {
  console.debug("Website Card=", web_url);

  return (
         
         
    <div className="card-body">
<a href={web_url}>{web_url}</a>
            <p>{description}</p>
          <p style={{color: 'white'}}>User ID:  <small>{user_id}</small></p>
        </div>
 
 
  );
}

export default WebsiteCard;
