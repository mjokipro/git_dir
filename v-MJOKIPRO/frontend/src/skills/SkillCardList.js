import React from "react";
import SkillCard from "./SkillCard";

/** Show list of job cards.
 *
 * Used by both JobList and CompanyDetail to list jobs. Receives an apply
 * func prop which will be called by JobCard on apply.
 *
 * JobList -> JobCardList -> JobCard
 * CompanyDetail -> JobCardList -> JobCard
 *
 */

function SkillCardList({ skills, add }) {
  console.debug("SkillCardList", "skills=", skills);

  return (
    <div style={{ marginTop: '50px', paddingRight: '25px', paddingLeft: '25px', borderRadius: '6px'}}  className="mb-3 CompanyList-list">
    {skills.map(s => (
            <SkillCard
                key={s.id}
                id={s.id}
                name={s.name}
            />
        ))}
      </div>
  );
}

export default SkillCardList;
