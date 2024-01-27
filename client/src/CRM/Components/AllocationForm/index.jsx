import React, { useEffect, useState } from 'react';
import { useGetHeadingCategoriesMasterQuery } from '../../../redux/CrmServices/HeadingCategoriesMasterServices';
import { useGetAllocationFormQuery } from '../../../redux/CrmServices/AllocationForm';
import { useAddAllocationFormMutation } from '../../../redux/CrmServices/AllocationForm';
import { toast } from "react-toastify";

import { useGetUserFormQuery } from '../../../redux/CrmServices/UserForm';
import secureLocalStorage from "react-secure-storage";


const AllocationForm = () => {
  const { data } = useGetHeadingCategoriesMasterQuery({});
  const { data: allData, isLoading, isFetching } = useGetAllocationFormQuery({});
  const {data : user} = useGetUserFormQuery({})
  const [ setId] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [addData] = useAddAllocationFormMutation();
  const [storeData, setStoreData] = useState({});
  useEffect(() => {
    const createdById = secureLocalStorage.getItem(sessionStorage.getItem("sessionId") + "userId");
    setStoreData({
      selectedUser,
      selectedData,
      createdById,
    });
  }, [selectedUser, selectedData])
  console.log(storeData,'storeData')

  const handleSubmitCustom = async (callback, data, text) => {
    try {
      let returnData = await callback(data).unwrap();
      setId(returnData.data.id);
      toast.success(text + " successfully");
     
   
      window.location.reload();
    } catch (error) {
      console.log("Error handling logic here");
    }
  };
  const saveData = () => {

    if (!selectedUser) {
      alert('Please select a User');
      return;
    }
    if (!selectedData || selectedData.length === 0) {
      alert('Please select a Data....');
      return;
    }
 
    if (!window.confirm("Are you sure you want to save the details?")) {
      return;
    }
 
    else {
      handleSubmitCustom(addData, storeData, "Added");

   
      setSelectedUser(null);
      setSelectedData([]);  
  }
  };
 

const handleSelectHeading = (id) => {
  console.log(id,'id')
  const selectedId = id
  setSelectedUser(selectedId)
};

  console.log(selectedUser,'selectedUser')
  const params = {
    companyId: secureLocalStorage.getItem(
        sessionStorage.getItem("sessionId") + "userId"
    ),
};
console.log(params,'params')

 
  const handleSelectAllCheckboxChange = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
 
    if (!selectAll) {
      const allLeadIds = allData?.data?.map((lead) => lead.id) || [];
      setSelectedData(allLeadIds);
    } else {
      setSelectedData([]);
    }
  };
  const handleRowClick = (leadId) => {
    setIsChecked(!isChecked);
    if (selectedData.includes(leadId)) {
      setSelectedData(selectedData.filter((id) => id !== leadId));
    } else {
      setSelectedData([...selectedData, leadId]);
    }
    console.log(`Row with ID ${leadId} clicked`);
 
  };

  const handleCheckboxChange = (leadId) => {
    setIsChecked(!isChecked);
    console.log(leadId)
    if (selectedData.includes(leadId)) {
      setSelectedData(selectedData.filter((id) => id !== leadId));
    } else {
      setSelectedData([...selectedData, leadId]);
    }
   
  };
   console.log(selectedData,'selectedData')  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isFetching) {
    return <p>Fetching...</p>;
  }

  return (
    <div>
     <select color="blue" label="Select Version" className="bg-gray-200 border-2 border-gray-400 text-gray-900 text-sm rounded-lg mx-10 my-5 focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  dark:focus:border-blue-500"
  onChange={(e) => handleSelectHeading(e.target.value)}
>
  <option value="" disabled selected hidden>
    Select a User
  </option>
  {user?.data?.map((value) => (
    <option key={value.id} value={value.id}>
      {value.username}
    </option>
  ))}
</select>

      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 overflow-scroll">
        <div className='h-3/4'>
        <table className="border text-sm overflow-x-scroll overflow-y-scroll w-full">
          <thead className="bg-indigo-500 border-2 font-sans sticky top-0">
            <tr className="bg-gray-400">
              <th className="px-5 py-5">
                <label>
                  <input type="checkbox" className="checkbox w-4 h-4"  
                      checked={(allData?.data ? allData?.data : []).every(i=>selectedData.includes(i.id))}

                onChange={handleSelectAllCheckboxChange} />
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
          <tbody className="bg-amber-200 divide-y divide-gray-500 border-collapse text-left ">
            {(allData?.data ? allData?.data : []).map((lead) => (
              <tr key={lead.id} className="hover:bg-blue-300 " onClick={() => handleRowClick(lead.id)}>
                <td className="px-5 py-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox w-4 h-4"
                      checked={selectedData.includes(lead.id)}
                      onChange={() => handleCheckboxChange(lead.id)}
                    />
                  </label>
                </td>
                {data?.data?.map((value) => (
                  <td key={value.id} className=" py-2 whitespace-nowrap">
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
        <button onClick={saveData} className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-700 relative hover:bg-gradient-to-r hover:from-green-700 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative"onClick={saveData}>assign</span>
        </button>
      </div>
    </div>
  );
};

export default AllocationForm;