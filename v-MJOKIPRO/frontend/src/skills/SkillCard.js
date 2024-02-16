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

  // const { hasAddedSkill, setHasAddedSkill } = useContext(UserContext);
  // const [added, setAdded] = useState();

  // React.useEffect(function updateAppliedStatus() {
  //   console.debug("Skill Card useEffect update skill status", "id=", id);

  //   setAdded(hasAddedSkill(id));
  // }, [id, hasAddedSkill]);

  /** Apply for a job */
  async function handleApply(evt) {
  //   if (hasAddedSkill(id)) return;
  //   setHasAddedSkill(id);
  //   setAdded(true);
    }

  return (
      <div className="JobCard card"> 
        <div className="card-body">
          <h6 className="card-title">{name}</h6>
          <p>{id}</p>
         
          <button
              className="btn btn-danger font-weight-bold text-uppercase float-right"
              onClick={handleApply}
              // disabled={added}
          >
            {/* {added ? "Added" : "Add"} */}
          </button>
        </div>
      </div>
  );
}

/** Render integer salary like '$1,250,343' */

// function formatSalary(salary) {
//   const digitsRev = [];
//   const salaryStr = salary.toString();

//   for (let i = salaryStr.length - 1; i >= 0; i--) {
//     digitsRev.push(salaryStr[i]);
//     if (i > 0 && i % 3 === 0) digitsRev.push(",");
//   }

//   return digitsRev.reverse().join("");
// }


export default SkillCard;
