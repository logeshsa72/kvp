import { findFromList } from "../../../Utils/helper";
import secureLocalStorage from "react-secure-storage";
import { useGetHeadingCategoriesMasterQuery } from "../../../redux/CrmServices/HeadingCategoriesMasterServices";
import { Loader } from "../../../Basic/components";
import HeadingFields from "../HeadingFields"

const HeadingSelectionTable = ({ HeadingCategoriesId, header, importedData }) => {

  const companyId = secureLocalStorage.getItem(
    sessionStorage.getItem("sessionId") + "userCompanyId"
  );

  const {
    data: HeadingCategoriesList,
    isLoading: HeadingCategoriesLoading,
    isFetching: HeadingCategoriesFetching,
  } = useGetHeadingCategoriesMasterQuery({ params: { companyId, active: true } });

  if (HeadingCategoriesFetching || HeadingCategoriesLoading) return <Loader />;

  const newHead = header.map(value => value)

  return (
    <>
      <div className="flex border border-black h-full overflow-auto">
        <table className="border border-gray-600 text-xs w-full">
          <thead className="bg-blue-200 top-0 sticky">
            <th className="border border-gray-600 text-center py-2 col-span-2">
              Heading
            </th>
            <th className="flex items-center justify-start gap-5 bg-white py-2 px-1">
              <label className="font-semibold">Source</label>
              <input
                type="text"
                disabled={true}
                className="bg-white border border-gray-500 rounded p-1"
                value={findFromList(
                  HeadingCategoriesId,
                  HeadingCategoriesList.data,
                  "name"
                )}
              />
            </th>
          </thead>
          <thead>
            <tr>
              <th className="table-data border border-gray-600 text-left px-1">
                Select
              </th>
              <th className="table-data border border-gray-600 text-left px-1">
                Heading Data
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto border border-gray-600">
            {header.map(value => {
              return (
                <tr>
                  <th className="border border-black">
                    <input className="" type="checkbox" />
                  </th>
                  <td className="border border-black">
                    <input
                      type="text"
                      className="border w-full h-6"
                      value={value}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
       <HeadingFields />
      </div>
    </>
  );
};

export default HeadingSelectionTable;
