import React from 'react'
import {Link} from 'react-router-dom'

const CompanyCard = ({name, description, logoUrl, handle}) => {
    console.debug("company card", logoUrl)

    return (
        
            <Link to={`/companies/${handle}`}>
                <div className='CompanyCard card'>
                    <div className='card-body'>
                    <h4>
                        {name}
                        {logoUrl && <img src={logoUrl} alt={name} />}
                    </h4>
                    <p><small>{description}</small></p>
                    </div>
                </div>
            </Link>
        
    )
}

export default CompanyCard