import React, {useState, useEffect} from 'react'
import CompanyCard from './CompanyCard'
import SearchForm from '../common/SearchForm'
import JoblyApi from '../api/api'

function CompanyList(){
    console.debug("company list")
    const [companies, setCompanies] = useState(null)

    useEffect(
        function getCompaniesInit(){
            search()
        }, []
    )

    async function search(name) {
        let companies = await JoblyApi.getAllCompanies(name)
        console.log(companies)
        setCompanies(companies)
    }

if (!companies) return <p>Loading...</p>

    return (
        <div>
            <p>Company List</p>
            <SearchForm searchFor={search}/>
            {companies.length 
                ? (
                    <div>
                        {companies.map(c => (
                            <CompanyCard 
                                key={c.handle}
                                handle={c.handle}
                                name={c.name}
                                description={c.description}
                                logoUrl={c.logourl}
                            />))
                        }
                    </div>
                ) : (<p>No results</p>)
            }
        </div>
    )
}

export default CompanyList