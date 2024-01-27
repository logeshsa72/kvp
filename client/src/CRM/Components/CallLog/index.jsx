import React, { useState, useEffect } from 'react';
import { useGetHeadingCategoriesMasterQuery } from '../../../redux/CrmServices/HeadingCategoriesMasterServices';
import { useGetCallLogQuery } from '../../../redux/CrmServices/CallLog';
import { useGetAllocationFormByIdQuery, } from '../../../redux/CrmServices/AllocationForm';
import secureLocalStorage from "react-secure-storage";
import { FcEndCall, FcCallback } from "react-icons/fc";
import { FaWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAddCalllogMutation } from '../../../redux/CrmServices/CallLog';
import { RiUserUnfollowFill, RiUserFollowFill } from "react-icons/ri"
import { CiNoWaitingSign } from "react-icons/ci";

const CallLog = () => {
  const params = {
    userId: secureLocalStorage.getItem(
      sessionStorage.getItem("sessionId") + "userId"
    ),
  };
  const { data } = useGetHeadingCategoriesMasterQuery({});
  const { data: allData, isLoading, isFetching } = useGetCallLogQuery({ params });
  console.log(data, "allData")
  const [selectedData, setSelectedData] = useState([]);
  const [Id, setId] = useState(null); // You should have this line in your component
  const [isChecked, setIsChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const initialRowStates = Array(allData?.data.length).fill(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [rowStates, setRowStates] = useState(initialRowStates);
  const [commentValue, setCommentValue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [storeData, setStoreData] = useState({});
  const [addData] = useAddCalllogMutation();
  const [allocatedDataId, setAllocatedDataId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleCommentChange = (event) => {
    setCommentValue(event.target.value);
  };
  console.log(selectedStatus, 'selectedStatus')
  useEffect(() => {
    setStoreData({
      commentValue,
      selectedDate,
      allocatedDataId,
      selectedStatus
    });
  }, [commentValue, selectedDate, allocatedDataId, selectedStatus])
  console.log(storeData, 'storedata')
  console.log(data, 'dataaaa')

  const handleSubmitCustom = async (callback, data, text) => {
    try {
      let returnData = await callback(data).unwrap();
      setId(returnData.callLogData.id);
        console.log(returnData, "returnData");

      toast.success(text + " successfully");
    } catch (error) {
      console.log("Error handling logic here:", error);
    }
  };
  
  
  const saveData = async () => {
    console.log(`Status selected: ${selectedStatus}, Date: ${selectedDate}`);
  
    if (!commentValue) {
      alert('Please Enter Comment');
      return;
    }
  
    if (selectedStatus === null) {
      alert('Please Select a Status');
      return;
    }
  
    if (!window.confirm("Are you sure you want to save the details?")) {
      return;
    }
  
    try {
      
      await handleSubmitCustom(addData, storeData, "Added");
  
      setCommentValue('');
      setSelectedDate('');
  
      setShowPopup(false);
    } catch (error) {
      console.error("Error handling logic here:", error);
    }
  };
  
  const {
    data: singleData,
    isFetching: isSingleFetching,
    isLoading: isSingleLoading,
  } = useGetAllocationFormByIdQuery(selectedData, { skip: !selectedData.length });

  useEffect(() => {
    if (singleData && singleData.data && singleData.data.id) {
      setAllocatedDataId(singleData.data.id);
    }
    console.log(allocatedDataId, 'allocatedDataId');
  }, [singleData]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isSingleFetching) {
    return <p>Fetching...</p>;
  }
  if (isSingleLoading) {
    return <p>Loading...</p>;
  }

  if (isFetching) {
    return <p>Fetching...</p>;
  }
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleIconClick = (index, leadId) => {
    setShowPopup(!showPopup);

    const newStates = [...rowStates];
    newStates[index] = !newStates[index];
    setRowStates(newStates);
    setIsChecked(!isChecked);

    if (selectedData.includes(leadId)) {
      setSelectedData(selectedData.filter((id) => id !== leadId));
    } else {
      setSelectedData([...selectedData, leadId]);
    }
  };
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    if (status === 'FOLLOWUP') {
      setIsDatePickerOpen(true);
    } else {
      setIsDatePickerOpen(false);
    }

  };
  return (
    <div className='mx-5 my-10'>
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 overflow-scroll">
        <div className='h-3/4 min-h-32'>
          <table className="border text-sm overflow-x-scroll overflow-y-scroll w-full">
            <thead className="bg-indigo-500 border-2 font-sans sticky top-0">
              <tr className="bg-gray-400">
                <th className="px-5 py-5">
                  <label>
                    <div className="cursor-pointer select-none text-2xl">
                      {isActive ? <FcCallback onClick={() => {
                        setIsActive(!isActive)
                      }} /> :
                        <FcEndCall onClick={() => {
                          setIsActive(!isActive)
                        }} />
                      }
                    </div>


                  </label>
                </th>
                {data?.data?.map((value) => (
                  <th
                    key={value.id}
                    scope="col"
                    className="w-1/4 py-2  text-left bg-gray-400 text-gray-800 font-bold uppercase"
                  >

                    <td className="bg-gray-400 border-collapse" type="text" value={value.name}>
                      <input className="bg-gray-400 border-collapse " type="text" value={value.name} readOnly />
                    </td>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-amber-200 divide-y divide-gray-500 border-collapse text-left">
              {(allData?.data ? allData.data : []).map((lead, leadIndex) => (
                <tr key={lead.id} className="hover:bg-blue-300">
                  <td className="px-5 py-2">
                    <label className="inline-flex items-center">
                      <div className="cursor-pointer select-none text-2xl">
                        {rowStates && rowStates[lead.id, leadIndex] ? (
                          <FcCallback onClick={() => handleIconClick(leadIndex, lead.id)} />
                        ) : (
                          <FcEndCall onClick={() => handleIconClick(leadIndex, lead.id)} />
                        )}
                      </div>
                    </label>
                  </td>
                  {data?.data?.map((value) => (
                    <td key={value.id} className="py-2 whitespace-nowrap">
                      {lead[value.name]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
      <div className="text-right px-10 py-2">
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 mx-auto rounded shadow-lg bg-amber-50 relative overflow-y-auto grid grid-cols-2 gap-4 overflow-auto custom-scrollbar">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-0 left-0 m-4 text-red-700 hover:text-gray-800 "
              >
                <FaWindowClose />
              </button>
              {data?.data?.map((value) => (
                <div key={value.id} scope="col" className='text-left m-1'>
                  <label className="text-blue-800  ">{value.name}</label>
                  <input
                    type="text"
                    value={(singleData.data)[value.name]}
                    readOnly
                    className="border border-blue-900 rounded p-2 w-full mt-1"
                  />
                </div>
              ))}
              <textarea
                className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1 border-blue-900"
                name="comment"
                placeholder="Add Comment"
                value={commentValue}
                onChange={handleCommentChange}
              ></textarea>
              <div>
                <button
                  checked={selectedStatus === "INTERESTED"}
                  onClick={() => handleStatusChange("INTERESTED")}
                  className="relative rounded px-5 py-2.5 mx-3 overflow-hidden group bg-blue-700 relative hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300"
                >
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative"><RiUserFollowFill /></span>
                </button>

                <button
                  checked={selectedStatus === "NOTINTERESTED"}
                  onClick={() => handleStatusChange("NOTINTERESTED")}
                  className="relative rounded px-5 py-2.5 mx-3 overflow-hidden group bg-red-700 relative hover:bg-gradient-to-r hover:from-red-700 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300"
                >
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative"><RiUserUnfollowFill /></span>
                </button>

                <button
                  checked={selectedStatus === "FOLLOWUP"}
                  onClick={() => handleStatusChange("FOLLOWUP")}
                  className="relative rounded px-5 py-2.5 mx-3 overflow-hidden group bg-yellow-700 relative hover:bg-gradient-to-r hover:from-yellow-700 hover:to-yellow-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 transition-all ease-out duration-300"
                >
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative"><CiNoWaitingSign /></span>
                </button>
                <button
                  onClick={saveData}
                  className="relative rounded px-5 py-2.5 mx-3 overflow-hidden group bg-green-700 relative hover:bg-gradient-to-r hover:from-green-700 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
                >
                  Save Data
                </button>
                <p className='p-3 text-red-500 bg-transparent'> {selectedStatus}</p>

                {isDatePickerOpen && (
                  <div className="mt-3">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="border border-blue-900 rounded p-2 w-32 mt-1"
                      max="yyyy-mm-dd"
                      min="yyyy-mm-dd"

                    />

                  </div>
                )}

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CallLog;
