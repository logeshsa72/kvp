import React from 'react'
import { useGetLeadCategoriesMasterQuery } from '../../../redux/CrmServices/LeadCategoriesMasterServices'

const LeadFields = () => {
    const { data } = useGetLeadCategoriesMasterQuery()
    return (
        <div>{JSON.stringify(data)}</div>
    )
}

export default LeadFields