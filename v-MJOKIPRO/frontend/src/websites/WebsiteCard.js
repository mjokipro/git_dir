import React from "react";
import { Link } from "react-router-dom";

import "./WebsiteCard.css";

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function WebsiteCard({ id, user_id, title, description, web_url }) {
  console.debug("Website Card=", web_url, "title=", title);

  return (
         <div style={{borderBottom: 'rgba(30, 98, 108, 0.729)'}} className="text-center">
          {/* <h2>{name}</h2> */}
         <a className="font-weight-bold " style={{color: 'rgba(5, 20, 43, 0.700)', fontSize: '20px'}} href={web_url}>{title}</a>
            <div className="card text-white mt-3 mb-5 text-left" style={{borderBottom: '4px solid rgba(30, 98, 108, 0.729)', backgroundImage: 'linear-gradient(to  left, rgba(5, 20, 43, 0.700), rgba(11, 22, 36, 0.900))'}}>
              <Link className="mt-3 mr-3 mb-3 ml-3 text-primary-emphasis"  to={`/websites/${id}`}>
              {description}
              </Link>
            </div>
          </div>
 
  );
}

export default WebsiteCard;
