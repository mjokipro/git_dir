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
        {skills.length
            ? <SkillCardList skills={skills} />
            : <p className="lead">Sorry, no results were found!</p>
        }
      </div>
  );
}

export default SkillList;
