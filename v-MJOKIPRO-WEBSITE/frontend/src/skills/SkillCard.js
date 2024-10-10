import React, {  } from "react";
import "./SkillCard.css";
// import UserContext from "../auth/UserContext";

/** Show limited information about a job.
 *
 * Is rendered by JobCardList to show a "card" for each job.
 *
 * Receives apply func prop from parent, which is called on apply.
 *
 * JobCardList -> JobCard
 */

function SkillCard({ id, name }) {
  console.debug("Skill Card name =", name);

  return (
      <div style={{borderRadius: '4px'}} className="JobCard card mt-4"> 
        <div style={{borderBottom:  '4px solid rgba(30, 98, 108, 0.729)', borderRadius: '4px', backgroundImage: 'linear-gradient(to  left, rgba(5, 20, 43, 0.700), rgba(11, 22, 36, 0.900))'}} className="card-body">
          <h6 className="card-title text-white">{name}</h6>
        </div>
      </div>
  );
}

export default SkillCard;
