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
      <div style={{paddingBottom: '15px', borderRadius: '6px', border: '4px solid rgba(30, 98, 108, 0.729)'}} className="CompanyList text-center col-md-8 offset-md-2">
    
            <div className="container  mt-4" style={{ paddingTop: '15px', paddingBottom: '15px', borderRadius: '4px', borderBottom: '4px solid rgba(30, 98, 108, 0.729)', backgroundImage: 'linear-gradient(to  left, rgba(47, 45, 53, 0.777), rgba(22, 22, 36, 0.908))'}}>
              <p className=" display-4" style={{fontSize: '47px', color: 'rgba(31, 117, 131, 0.821)'}}>{website.title}</p>
       
              <a className="font-weight-bold text-center" style={{color: 'rgba(246, 69, 122, 0.792)', fontSize: '20px'}} href={website.web_url}>
               {website.web_url}</a>
            </div>

            <div className="container mt-4" style={{border: '4px solid rgba(30, 98, 108, 0.729)', borderRadius: '6px'}}>
                <div className="card text-white mb-5 mt-3 text-left" style={{borderBottom: '4px solid rgba(30, 98, 108, 0.729)', backgroundImage: 'linear-gradient(to  left, rgba(5, 20, 43, 0.700), rgba(11, 22, 36, 0.900))'}}>
                    <p  className="mt-3 mr-3 mb-3 ml-3 text-primary" >
                    {website.description}
                    </p>
                </div>
                <h3 style={{color: 'rgba(5, 20, 43, 0.700)'}} className="display-4 mb-4">{`Areas of Expertise...`}</h3>

              <SkillCardList skills={website.skills} />
            </div>
      </div>
  );
}

export default WebsiteDetail;
