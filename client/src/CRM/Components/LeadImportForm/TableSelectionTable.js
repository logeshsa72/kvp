export default function TableSelectionTable({ newhead }) {

  return (
    <>
      <tbody className="overflow-y-auto border border-gray-600 w-full">
        {newhead.map(value => {
          return (
            <tr>
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
    </>
  )






}




