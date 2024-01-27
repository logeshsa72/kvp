import React from 'react'

const MatchedFields = ({ excelFields }) => {
    return (
        <div className="flex border border-black h-full overflow-auto w-1/2" >
            <table className="border border-gray-600 text-xs w-full">
                <thead>
                    <tr>
                        <th className="table-data border border-gray-600 text-left px-1">
                            Excel Field
                        </th>
                        <th className="table-data border border-gray-600 text-left px-1">
                            Matched Heading
                        </th>
                    </tr>
                </thead>
                <tbody className="overflow-y-auto border border-gray-600">
                    {excelFields.map(value => {
                        return (
                            <tr>
                                <th className="border border-black">
                                    {value.name}
                                </th>
                                <td className="border border-black">
                                    <input
                                        type="text"
                                        className="border w-full h-6"
                                        value={value.headingName}
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

export default MatchedFields
