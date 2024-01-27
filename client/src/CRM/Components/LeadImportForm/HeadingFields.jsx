import React from 'react'
import { useGetHeadingCategoriesMasterQuery } from '../../../redux/CrmServices/HeadingCategoriesMasterServices'

const HeadingFields = ({ currentSelectedExcelField, setCurrentSelectedExcelField, setExcelFields }) => {
    const { data } = useGetHeadingCategoriesMasterQuery({})
    function handleSelectHeading(field) {
        setExcelFields(prev => {
            console.log(prev, "prev", currentSelectedExcelField)
            const newPrev = structuredClone(prev);
            const index = newPrev.findIndex(i => i.name === currentSelectedExcelField.name)
            if (index === -1) return prev
            newPrev[index]["headingId"] = field.id
            newPrev[index]["headingName"] = field.name
            return newPrev
        })
        setCurrentSelectedExcelField("")
    }
    return (
        <div className="flex border border-black h-full overflow-auto w-1/2">
            <table className="border border-gray-600 text-xs w-full">
                <thead>
                    <tr>
                        <th className="table-data border border-gray-600 text-left px-1">
                            Select
                        </th>
                        <th className="table-data border border-gray-600 text-left px-1">
                            Lead Fields
                        </th>
                    </tr>
                </thead>
                <tbody className="overflow-y-auto border border-gray-600">
                    {(data?.data ? data?.data : []).map(value => {
                        return (
                            <tr>
                                <th className="border border-black">
                                    {currentSelectedExcelField &&
                                        <input className="" type="radio" onClick={() => handleSelectHeading(value)} />
                                    }
                                </th>
                                <td className="border border-black">
                                    <input
                                        type="text"
                                        className="border w-full h-6"
                                        value={value.name}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default HeadingFields