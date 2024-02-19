import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import WebsiteCard from "./WebsiteCard";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

function WebsiteList() {
  
  const [websites, setWebsites] = useState([]);
  console.debug("Website List=", websites);

  useEffect(function getCompaniesOnMount() {
    console.debug("CompanyList useEffect getCompaniesOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads companies. */
  async function search(title) {
    let websites = await JoblyApi.getWebsites(title);
    setWebsites(websites);
  }

  if (!websites) return <LoadingSpinner />;

  return (
      <div  className="CompanyList col-md-8 offset-md-2">
        {/* <SearchForm searchFor={search} /> */}
        <div className="container" style={{borderRadius: '6px', border: '4px solid rgba(30, 98, 108, 0.729)'}}>
        <div className="container  mt-4" style={{borderRadius: '4px', borderBottom: '4px solid rgba(30, 98, 108, 0.729)', backgroundImage: 'linear-gradient(to  left, rgba(47, 45, 53, 0.777), rgba(22, 22, 36, 0.908))'}}>
          <p className=" display-4" style={{fontSize: '47px', color: 'rgba(31, 117, 131, 0.821)'}}>Most Recent Developments...</p>
          <p style={{marginLeft: '20px', fontSize: '20px', color: ' rgba(246, 69, 122, 0.792)'}}>{`Tested And Designed At: `} <span style={{color: 'rgba(31, 117, 131, 0.821)'}}>{`[ { mjokipro }, ... ]`}</span></p>
       
        </div>
        {websites.length
            ? (
                <div style={{marginTop: '50px', paddingRight: '25px', paddingLeft: '25px', borderRadius: '6px', border: '4px solid rgba(30, 98, 108, 0.729)'}}  className="CompanyList-list">
                  {websites.map(w => (
                      <WebsiteCard
                          key={w.id}
                          id={w.id}
                          title={w.title}
                          user_id={w.user_id}
                          web_url={w.web_url}
                          description={w.description}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
      </div>
  );
}

export default WebsiteList;
