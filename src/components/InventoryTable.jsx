const InventoryTable = (props) => {
  return (
    <>
      <h1 className="p-4 text-xl font-bold">{props.title.toUpperCase()}</h1>
      <table className="table-auto items-center justify-items-center">
        <thead>
          <tr>
            <th className="border-collapse border border-slate-400 p-2">
              Type
            </th>
            <th className="border-collapse border border-slate-400 p-2">
              Quantity
            </th>
            <th className="border-collapse border border-slate-400 p-2">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {props.dataArr.map((item, idx) => {
            return (
              <tr key={idx}>
                <td className="border-collapse border border-slate-400 p-2">
                  {item.type}
                </td>
                <td className="border-collapse border border-slate-400 p-2">
                  {item.quantity}
                </td>
                <td className="border-collapse border border-slate-400 p-2">
                  {item.price}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default InventoryTable;
