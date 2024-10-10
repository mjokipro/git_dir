import React, { useState, useEffect } from "react";
import Search from "../common/SearchForm";
import JoblyApi from "../api/api";
import SkillCardList from "./SkillCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of jobs.
 *
 * On mount, loads jobs from API.
 * Re-loads filtered jobs on submit from search form.
 *
 * JobList -> JobCardList -> JobCard
 *
 * This is routed to at /jobs
 */

function SkillList() {
  console.debug("Skill List");

  const [skills, setSkills] = useState(null);

  useEffect(function getAllJobsOnMount() {
    console.debug("SkillList useEffect getAllJobsOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads jobs. */
  async function search(name) {
    let skills = await JoblyApi.getSkills(name);
    setSkills(skills);
  }

  if (!skills) return <LoadingSpinner />;

  return (
      <div className="JobList col-md-8 offset-md-2">
        <Search searchFor={search} />
        <div className="container" style={{borderRadius: '6px', border: '4px solid rgba(30, 98, 108, 0.729)'}}>
        <div className="container  mt-4" style={{borderRadius: '4px', borderBottom: '4px solid rgba(30, 98, 108, 0.729)', backgroundImage: 'linear-gradient(to  left, rgba(47, 45, 53, 0.777), rgba(22, 22, 36, 0.908))'}}>
          <p className=" display-4" style={{fontSize: '50px', color: 'rgba(31, 117, 131, 0.821)'}}>Expertise</p>
          <p style={{marginLeft: '20px', fontSize: '20px', color: ' rgba(246, 69, 122, 0.792)'}}>{`Software Solutions Provided By: `} <span style={{color: 'rgba(31, 117, 131, 0.821)'}}>{`[ { mjokipro }, ... ]`}</span></p>
       
        </div>
        
        {skills.length
            ? <SkillCardList skills={skills} />
            : <p className="lead">Sorry, no results were found!</p>
        }
      </div>
      </div>
  );
}

export default SkillList;
