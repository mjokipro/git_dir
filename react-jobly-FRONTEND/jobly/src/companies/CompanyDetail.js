import React, {useState, useEffect} from 'react'
import JobCardList from '../jobs/JobCardList'
import {useParams} from 'react-router-dom'
import JoblyApi from '../api/api'

const CompanyDetail = () => {
    const {handle} = useParams()

    const [company, setCompany] = useState(null)

    useEffect(
        function getCompanyAndJobsForUser(){
            async function getCompany(){
                setCompany(await JoblyApi.getCompany(handle))
            }
            getCompany()
        }, [handle]
    )

    if (!company) return <p>Loading...</p>

    return (
        <div>
            <h3>{company.name}</h3>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs} />
        </div>
    )
}

export default CompanyDetail