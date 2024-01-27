import React, { useState } from "react";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import LeadSelectionTable from "./LeadSelectionTable";



const ExcelSelectionTable = ({
    tableHeading}) => {
    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);

    // dataHeading(rows,cols);

    tableHeading(rows);
    const changeHandler = (event) => {
        let fileObj = event.target.files[0];
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                setCols(resp.cols);
                setRows(resp.rows);
                console.log(resp);
            

                <>
                    
                    </>
            }
        });
    };



    return (
        <div className="w-full">{console.log(rows)}
            <div className="w-full flex flex-col gap-5">
                <div className="mt-3 flex justify-start items-center gap-10">
                    <h1 className="text-sm">Upload File</h1>
                    <input class="text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="default_size" type="file"
                        onChange={changeHandler}
                    />
                    
                </div>
                <div className="excel-table-wrapper">
                    <OutTable
                        data={rows}
                        columns={cols}
                        tableClassName="excel-table"
                        tableHeaderRowClass="heading"
                    />
                    
                    
                </div>
            </div>
        </div>
    );
};

export default ExcelSelectionTable;




// import React, { useState } from "react";
// import { read, utils, writeFile } from 'xlsx';
// import { DOWNLOAD } from "../../../icons";

// const ExcelSelectionTable = () => {
//     const [movies, setMovies] = useState([]);

//     const handleImport = ($event) => {
//         const files = $event.target.files;
//         if (files.length) {
//             const file = files[0];
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 const wb = read(event.target.result);
//                 const sheets = wb.SheetNames;

//                 if (sheets.length) {
//                     const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
//                     setMovies(rows)
//                 }
//             }
//             reader.readAsArrayBuffer(file);
//         }
//     }

//     const handleExport = () => {
//         const headings = [[
//             'FirstName',
//             'LastName',
//             'City',
//             'State'
//         ]];
//         const wb = utils.book_new();
//         const ws = utils.json_to_sheet([]);
//         utils.sheet_add_aoa(ws, headings);
//         utils.sheet_add_json(ws, movies, { origin: 'A1', skipHeader: true });
//         utils.book_append_sheet(wb, ws, 'Report');
//         writeFile(wb, 'Lead Report.xlsx');
//     }

//     return (
//         <>
//             <div className="flex flex-col w-full">
//                 <div className="row mb-2 mt-5">
//                     <div className="col-sm-6 offset-3">
//                         <div className="flex items-center gap-10">
//                             <div className="col-md-6">
//                                 <input class="block w-full text-sm border rounded cursor-pointer text-gray-100 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" id="default_size" type="file" required onChange={handleImport}
//                                     accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <button onClick={handleExport} className="btn btn-primary float-right bg-blue-500 p-1 px-1.5 rounded text-white">
//                                     Export {DOWNLOAD}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-sm-6 offset-3">
//                         <table className="w-full border border-l-0 border-r-0 border-gray-400">
//                             <thead>
//                                 <tr className="text-base">
//                                     <th scope="col">Id</th>
//                                     <th scope="col">First Name</th>
//                                     <th scope="col">Last Name</th>
//                                     <th scope="col">City</th>
//                                     <th scope="col">State</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     movies.length
//                                         ?
//                                         movies.map((movie, index) => (
//                                             <tr className="text-sm text-center border border-l-0 border-r-0 border-gray-400" key={index}>
//                                                 <th className="py-1" scope="row">{index + 1}</th>
//                                                 <td className="">{movie.FirstName}</td>
//                                                 <td className="">{movie.LastName}</td>
//                                                 <td className="">{movie.City}</td>
//                                                 <td className="">{movie.State}</td>
//                                             </tr>
//                                         ))
//                                         :
//                                         <tr>
//                                             <td colSpan="5" className="text-center border border-l-0 border-r-0 border-gray-400 py-1 bg-red-100">No Leads Found.</td>
//                                         </tr>
//                                 }
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>

//     );
// };

// export default ExcelSelectionTable;
