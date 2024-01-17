import React, {useState, useEffect} from 'react'
import JobCardList from './JobCardList'
import SearchForm from '../common/SearchForm'
import JoblyApi from '../api/api'

const JobList = () => {
    console.debug("Job List")

    const [jobs, setJobs] = useState(null)

    useEffect(
        function getJobsInit() {
            search()
        }, []
    )

    async function search(title){
        let jobs = await JoblyApi.getAllJobs(title)
        console.log(jobs)
        setJobs(jobs)
    }

    if (!jobs) return <p>Loading...</p>

    return (
        <div>
            <p>JobList</p>
            <SearchForm searchFor={search}/>
            {jobs.length
                ? (
                    <div>
                        {jobs.map(j => (
                            <JobCardList 
                            jobs={jobs}
                            />))
                        }
                    </div>
                ) : (<p>No results</p>)  
            }

        </div>
    )
}

export default JobList