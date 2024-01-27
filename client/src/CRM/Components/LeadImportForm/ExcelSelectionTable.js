import React, { useState } from "react";
import { read, utils } from "xlsx";

const ExcelSelectionTable = ({ Headerrow, pres, setPres }) => {
  const [header, setHeader] = useState([]);

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: "array" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
      const headerNames = jsonData.shift();

      const transformedData = jsonData.slice(1).map((row) => {
        const obj = {};
        headerNames.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });
      setHeader(headerNames);
      Headerrow(headerNames.map(i => ({ name: i })));
      setPres(transformedData);
    };
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentLoaded = (event.loaded / event.total) * 100;
        console.log(`Loading progress: ${percentLoaded}%`);
      }
    };

    reader.readAsArrayBuffer(file);
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-5">
        <div className="mt-3 flex flex-col justify-start items-start gap-10">
          <div className="flex justify-center items-center gap-5">
            <h1 className="text-sm font-bold">Upload File</h1>
            <div className='flex items-center border border-lime-500 hover:bg-lime-500 transition rounded-md h-8 px-3'>
              <input type="file" id="profileImage" className='hidden' onChange={handleFileUpload} />
              <label htmlFor="profileImage" className="text-xs w-full font-bold text-center">Browse</label>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-xs">S.No</th>
                {JSON.stringify(header)}
                {header.map((columnName, index) => (
                  <th className="border border-gray-400 text-sm py-1" key={index}>{columnName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pres.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="text-xs">{rowIndex + 1}</td>
                  {header.map((columnName, columnIndex) => (
                    <td className="border border-gray-400 text-xs py-1" key={columnIndex}>{row[columnName]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
