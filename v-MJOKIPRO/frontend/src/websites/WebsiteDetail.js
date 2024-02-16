import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import SkillCardList from "../skills/SkillCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/** Company Detail page.
 *
 * Renders information about company, along with the jobs at that company.
 *
 * Routed at /companies/:handle
 *
 * Routes -> CompanyDetail -> JobCardList
 */

function WebsiteDetail() {
  const { id } = useParams();
  console.debug("Website Detail", "id=", id);

  const [website, setWebsite] = useState(null);

  useEffect(function getCompanyAndJobsForUser() {
    async function getCompany() {
      setWebsite(await JoblyApi.getWebsite(id));
    }

    getCompany();
  }, [id]);

  if (!website) return <LoadingSpinner />;

  return (
      <div className="CompanyDetail col-md-8 offset-md-2">
        <h4>{website.id}</h4>
        <p>{website.description}</p>
        <SkillCardList skills={website.skills} />
      </div>
  );
}

export default WebsiteDetail;
