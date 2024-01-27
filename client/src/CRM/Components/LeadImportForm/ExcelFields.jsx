import React from 'react'


const ExcelFields = ({ header, currentSelectedExcelField, setCurrentSelectedExcelField }) => {
    return (
        <div className="flex border border-black h-full overflow-auto w-1/2" >
            <table className="border border-gray-600 text-xs w-full">
                <thead>
                    <tr>
                        <th className="table-data border border-gray-600 text-left px-1">
                            Select
                        </th>
                        <th className="table-data border border-gray-600 text-left px-1">
                            Excel Data
                        </th>
                    </tr>
                </thead>
                <tbody className="overflow-y-auto border border-gray-600">
                    {header.map(value => {
                        return (
                            <tr>
                                <th className="border border-black">
                                    {!currentSelectedExcelField &&
                                        <input className="" type="radio" onClick={() => { setCurrentSelectedExcelField(value) }} />
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

export default ExcelFields
