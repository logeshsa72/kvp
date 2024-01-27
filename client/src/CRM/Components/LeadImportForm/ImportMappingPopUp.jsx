import { useState } from "react";
import ExcelFields from "./ExcelFields";
import HeadingFields from "./HeadingFields";
import MatchedFields from "./MatchedFields";

const ImportMappingPopUp = ({ header, setExcelFields, excelFields }) => {
  const [currentSelectedExcelField, setCurrentSelectedExcelField] = useState("");
  return (
    <div className="">
      <div className="flex w-full">
        <ExcelFields header={header} currentSelectedExcelField={currentSelectedExcelField} setCurrentSelectedExcelField={setCurrentSelectedExcelField} />
        <HeadingFields currentSelectedExcelField={currentSelectedExcelField} setExcelFields={setExcelFields} setCurrentSelectedExcelField={setCurrentSelectedExcelField} />
      </div>
      <MatchedFields excelFields={excelFields} />
    </div>
  );
};

export default ImportMappingPopUp;
