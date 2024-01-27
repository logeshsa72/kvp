import { findFromList } from '../../../Utils/helper';
import secureLocalStorage from "react-secure-storage";
import { useGetLeadCategoriesMasterQuery } from '../../../redux/CrmServices/LeadCategoriesMasterServices';
import { Loader } from '../../../Basic/components';


const LeadSelectionTable = ({leadCategoriesId,headers,header}) => {

   const companyId = secureLocalStorage.getItem(
        sessionStorage.getItem("sessionId") + "userCompanyId"
    )

    const { data: leadCategoriesList, isLoading: leadCategoriesLoading, isFetching: leadCategoriesFetching } =
        useGetLeadCategoriesMasterQuery({ params: { companyId, active: true } });

    if (leadCategoriesFetching || leadCategoriesLoading) return <Loader />

    

    return (
        <>
            {/* <Modal isOpen={Number.isInteger(currentSelectedIndex)} onClose={() => setCurrentSelectedIndex("")}>
                <TaxDetailsFullTemplate readOnly={readOnly} setCurrentSelectedIndex={setCurrentSelectedIndex} taxTypeId={taxTypeId} currentIndex={currentSelectedIndex} poItems={poItems} handleInputChange={handleInputChange} isSupplierOutside={isSupplierOutside} />
            </Modal> */}
            {
                <>
                    <div className="grid grid-cols-2 border border-black h-full">
                        <table className="border border-gray-600 text-xs table-auto w-full">
                            <thead className='bg-blue-200 top-0'>
                                <tr>
                                    <th className="table-data border border-gray-600 text-center py-2">Excel</th>
                                </tr>
                                <tr className='flex items-center justify-start gap-5 bg-white py-2 px-1'>
                                    <label className='font-semibold'>Source</label>
                                    <input type='text' disabled={true} className='bg-white border border-gray-500 rounded p-1' value={findFromList(leadCategoriesId, leadCategoriesList.data, "name")} />
                                </tr>
                                <tr>
                                    <th className="table-data border border-gray-600 text-left px-1">Excel Data</th>
                        
                                </tr>
                            </thead>
                            <tbody className='overflow-y-auto border border-gray-600 w-full'>
                                 {header.map((value)=>
                             (
                                    <tr>
                                    <td className='border border-black'>
                                        <input type='text' className='border w-full h-6' value={value} />
                                    </td>
                                </tr>  
                               
                             )
                             
                                    
                             )} 
                                   {/* <tr>
                                    <td className='border border-black'>
                                        <input type='text' className='border w-full h-6' value={headers} />
                                    </td>
                                </tr>



                                <tr>
                                     <td className='border border-black '>
                                         <input type='text' className='border w-full h-6'  />
                                     </td>
                                 </tr>
                                 <tr>
                                     <td className='border border-black '>
                                         <input type='text' className='border w-full h-6' />
                                     </td>
                                </tr>
                                 <tr>
                                    <td className='border border-black '>
                                        <input type='text' className='border w-full h-6' />
                                     </td>
                                 </tr>
                                 <tr>
                                     <td className='border border-black '>
                                         <input type='text' className='border w-full h-6' />
                                     </td>
                                 </tr>
                                 <tr>
                                 <td className='border border-black '>
                                         <input type='text' className='border w-full h-6' />
                                     </td>
                                 </tr>
                                 <tr>
                                     <td className='border border-black '>
                                         <input type='text' className='border w-full h-6' />
                                     </td>
                                 </tr>
                                 <tr>
                                    <td className='border border-black '>
                                     <input type='text' className='border w-full h-6' />
                                     </td>
                                 </tr> 
                                */}
                               
                              
                            </tbody>
                        </table>

                        <table className="border border-gray-600 text-xs table-auto w-full h-full">


                        </table>
                    </div>
                </>
            }
        </>
    )
}

export default LeadSelectionTable;