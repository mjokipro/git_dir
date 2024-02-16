import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
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
  async function search(user_id) {
    let websites = await JoblyApi.getWebsites(user_id);
    setWebsites(websites);
  }

  if (!websites) return <LoadingSpinner />;

  return (
      <div className="CompanyList col-md-8 offset-md-2">
        <SearchForm searchFor={search} />
        {websites.length
            ? (
                <div className="CompanyList-list">
                  {websites.map(w => (
                      <WebsiteCard
                          key={w.id}
                          id={w.id}
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
  );
}

export default WebsiteList;
