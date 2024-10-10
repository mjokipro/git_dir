import React from 'react'
// import './JobCard.css'


const JobCard = ({title, salary, equity, companyName}) => {
    console.debug("job card", title)

    return (
        <div>
           <p>JobCard</p>
            <h2>
                {title}
            </h2>
                <h1>{companyName}</h1>
                <p>{salary}</p>
                <p>{equity}</p>
        </div>
    )
}

export default JobCard