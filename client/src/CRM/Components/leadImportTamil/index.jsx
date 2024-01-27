import React, { useEffect, useState, useRef, useCallback } from "react";
import secureLocalStorage from "react-secure-storage";

import {
  useGetLeadImportFormQuery,
  useGetLeadImportFormByIdQuery,
  useAddLeadImportFormMutation,
  useUpdateLeadImportFormMutation,
  useDeleteLeadImportFormMutation,
} from "../../../redux/CrmServices/LeadImportFormServices";
import { useGetLeadCategoriesMasterQuery } from '../../../redux/CrmServices/LeadCategoriesMasterServices'
import { dropDownListObject } from "../../../Utils/contructObject";
import FormHeader from "../../../Basic/components/FormHeader";
import FormReport from "../../../Basic/components/FormReportTemplate";
import { toast } from "react-toastify";
import { DateInput, DropdownInput } from "../../../Inputs";
import ReportTemplate from "../../../Basic/components/ReportTemplate";
import LeadSelectionTable from "./LeadSelectionTable";
import ExcelSelectionTable from "./ExcelSelectionTable";
import moment from "moment";
import { DOWNLOAD } from "../../../icons";
import Modal from "../../../UiComponents/Modal";

const MODEL = "Data Import Form";


export default function Form() {
  const today = new Date()

  const [form, setForm] = useState(true);
  const [readOnly, setReadOnly] = useState(false);
  const [id, setId] = useState("");

  const [date, setDate] = useState(moment.utc(today).format('YYYY-MM-DD'));
  const [formReport, setFormReport] = useState(false);
  const [itemsPopup, setItemsPopup] = useState(false)
  const [leadCategoriesId, setLeadCategoriesId] = useState("")
  const [headers, setHeaders] = useState("")

  const [searchValue, setSearchValue] = useState("");

  const childRecord = useRef(0);

  const branchId = secureLocalStorage.getItem(
    sessionStorage.getItem("sessionId") + "currentBranchId"
  )
  const companyId = secureLocalStorage.getItem(
    sessionStorage.getItem("sessionId") + "userCompanyId"
  )
  const params = {
    branchId, companyId
  };

  const { data: allData, isLoading, isFetching } = useGetLeadImportFormQuery({ params, searchParams: searchValue });

  const {  
    data: singleData,
    isFetching: isSingleFetching,
    isLoading: isSingleLoading,
  } = useGetLeadImportFormByIdQuery(id, { skip: !id });

  const [addData] = useAddLeadImportFormMutation();
  const [updateData] = useUpdateLeadImportFormMutation();
  const [removeData] = useDeleteLeadImportFormMutation();

  const syncFormWithDb = useCallback((data) => {
    if (id) {
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
    setLeadCategoriesId(data?.leadCategoriesId ? data?.leadCategoriesId : "");
     
    setHeaders(data?.headers ? data?.headers : "");
    if (data?.date) setDate(data?.date);
  }, [id]);


  

  useEffect(() => {
    if (id) {
      syncFormWithDb(singleData?.data);
    } else {
      syncFormWithDb(undefined);
    }
  }, [isSingleFetching, isSingleLoading, id, syncFormWithDb, singleData]);

  const { data: LeadCategoriesList } =
    useGetLeadCategoriesMasterQuery({ params: { ...params, active: true } });

  const data = {
    leadCategoriesId
  }

  const validateData = (data) => {
    return
  }

  const handleSubmitCustom = async (callback, data, text) => {
    try {
      if (text === "Updated") {
        await callback({ id, body: data });
      } else {
        await callback(data)
      }
      toast.success(text + "Successfully");
    } catch (error) {
      console.log("handle");
    }
  };


  const saveData = () => {

    if (!validateData(data)) {
      toast.info("Please fill all required fields...!", { position: "top-center" })
      return
    }
    if (id) {
      handleSubmitCustom(updateData, data, "Updated");
    } else {
      handleSubmitCustom(addData, data, "Added");
    }
  }

  const deleteData = async () => {
    if (id) {
      if (!window.confirm("Are you sure to delete...?")) {
        return;
      }
      try {
        await removeData(id)
        setId("");
        onNew();
        toast.success("Deleted Successfully");
      } catch (error) {
        toast.error("something went wrong");
      }
    }
  };




  const handleKeyDown = (event) => {
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if ((event.ctrlKey || event.metaKey) && charCode === "s") {
      event.preventDefault();
      saveData();
    }
  };

  const onNew = () => {
    setId("");
    setForm(true);
    setSearchValue("");
    setReadOnly(false);
    syncFormWithDb(undefined)
  };

  function onDataClick(id) {
    setId(id);
    setForm(true);
  }
  const tableHeaders = ["Source", "Date"]
  const tableDataNames = ['dataObj?.id', 'dataObj.active ? ACTIVE : INACTIVE']

  const openModel = () => {
    setItemsPopup(true)
  }
 const[heading,setHeading]=useState([])
   const tableHeading=(rows)=>
   {
    setHeading(rows)
  }

  if (!form)
    return (<>
     <ReportTemplate
        heading={MODEL}
        tableHeaders={tableHeaders}
        tableDataNames={tableDataNames}
        loading={
          isLoading || isFetching
        }
        setForm={setForm}
        data={allData?.data}
        onClick={onDataClick}
        onNew={onNew}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      </>
     
    );

  return (
    <div
      onKeyDown={handleKeyDown}
      className="md:items-start md:justify-items-center grid h-full bg-theme overflow-auto"
    >
      <Modal isOpen={itemsPopup} onClose={() => {
        setItemsPopup(false);
      }} widthClass={"w-[1000px] h-[500px] overflow-auto"}>
       <LeadSelectionTable leadCategoriesId={leadCategoriesId} header={heading[0]} />
      </Modal>
      <div className="flex flex-col frame w-full h-full">
        <FormHeader
          onNew={onNew}
          onClose={() => {
            setForm(false); 

            setSearchValue("");
          }}
          model={MODEL}
          saveData={saveData}
          setReadOnly={setReadOnly}
          deleteData={deleteData}
          childRecord={childRecord.current}
        />
        <div className="flex-1 grid gap-x-2">
          <div className="col-span-3 grid overflow-auto">
            <div className='col-span-3 grid overflow-auto'>
              <div className='mr-1'>
                <div className={`grid ${formReport ? "grid-cols-12" : "grid-cols-1"}`}>
                  <div className={`${formReport ? "col-span-9" : "col-span-1"}`}>
                    <fieldset className='frame rounded-tr-lg rounded-bl-lg w-full border border-gray-600 h-[20%] px-3 overflow-auto'>
                      <legend className='sub-heading'>Lead Details</legend>
                      <div className="flex justify-end relative top-0 right-0">
                        <button className="text-xs bg-sky-500 hover:text-white font-semibold hover:bg-sky-800 transition rounded p-1" onClick={() => setFormReport(prev => !prev)}>
                          {formReport ? "Close Report >" : "Open Report <"}
                        </button>
                      </div>
                      <div className='flex flex-col justify-center items-start flex-1 w-full'>
                        <div className="flex flex-wrap ">
                          <div className="flex justify-center gap-5">
                            <DropdownInput name="Lead Out Source" type={"date"} required={true} readOnly={readOnly} value={leadCategoriesId} setValue={setLeadCategoriesId} options={dropDownListObject(LeadCategoriesList ? LeadCategoriesList.data : [], "name", "id")} />
                            <DateInput name="Lead Imported Date" value={date} type={"date"} required={true} readOnly={readOnly} />
                            <button className="bg-blue-500 text-white rounded p-1 hover:bg-blue-300 transition" onClick={openModel} setValue={setLeadCategoriesId}>Import {DOWNLOAD}</button>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset className='frame rounded-tr-lg rounded-bl-lg rounded-br-lg my-1 w-full border border-gray-600 md:pb-5 flex h-[400px] px-3 overflow-auto overflow-x-hidden'>
                      <legend className='sub-heading'>Lead Import Details</legend>
                      <ExcelSelectionTable params={params} readOnly={readOnly} tableHeading={tableHeading}  /> 
                    </fieldset>
                  </div>
                  <div className={`frame h-[500px] overflow-x-hidden ${formReport ? "block" : "hidden"} col-span-3`}>
                    <FormReport
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                      setId={setId}
                      tableHeaders={tableHeaders}
                      tableDataNames={tableDataNames}
                      data={allData?.data}
                      loading={
                        isLoading || isFetching
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}