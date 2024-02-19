import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";
import Summary from "./Summary";
import MatthewResume from './Matthew-Joki-Resume.pdf'

function AboutPage() {
  console.debug("About Page");
  const {currentUser} = useContext(UserContext)
  const [skills, setSkills] = useState(null);
  console.debug("currentUser=", currentUser, "Skills", skills)

useEffect(function getAllJobsOnMount() {
  console.debug("SkillList useEffect getAllJobsOnMount");
  search();
}, []);

async function search(name) {
  let skills = await JoblyApi.getSkills(name);
  setSkills(skills);
}

  return (
      <div style={{paddingBottom: '15px', borderRadius: '6px', border: '4px solid rgba(30, 98, 108, 0.729)'}} className="JobList col-md-8 offset-md-2">
        <div className="container  mt-4" style={{borderRadius: '4px', borderBottom: '4px solid rgba(30, 98, 108, 0.729)', backgroundImage: 'linear-gradient(to  left, rgba(47, 45, 53, 0.777), rgba(22, 22, 36, 0.908))'}}>
          <h1 style={{color: 'rgba(31, 117, 131, 0.821)'}} className="display-4 ">Matthew Joki</h1>
          <h2 style={{color: 'rgba(246, 69, 122, 0.792)', marginLeft: '35px'}} >Full Stack Developer</h2>
            {/* <img style={{float: 'right', marginRight: '10px'}} src={Matthew} height="200" width="200" /> */}
          <a style={{marginLeft: '5px', fontSize: '20px'}} href={MatthewResume}>Click For Resume</a>
        </div>
        <br />
        <br />
        <Summary />
      </div>
  );
}

export default AboutPage;
