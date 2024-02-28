import {
  useTable,
  Column,
  TableOptions,
  useSortBy,
  usePagination,
} from "react-table";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

/** Creating a Higher order function that returns a function
 * Columns should be the type of Column which is generic type T that extends object and it contains headers of table
 * Type of data should be the same as columns header type that's why T[]
 */
function Table<T extends Object>(
  columns: Column<T>[],
  data: T[],
  containerClassName: string,
  heading: string,
  pagination?: boolean,
  minHeight?: boolean
) {
  return function TableComponent() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: { pageSize: 6 },
    };
    const {
      getTableBodyProps,
      page,
      getTableProps,
      headerGroups,
      prepareRow,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      pageCount,
      state: { pageIndex },
    } = useTable(options, useSortBy, usePagination);

    return (
      <>
        <div
          className={`${containerClassName} ${minHeight ? "h-[650px]" : ""}`}
        >
          <div className="heading text-left text-2xl">{heading}</div>
          <div className="overflow-x-scroll md:overflow-hidden">
            <table className="md:w-full w-[768px]" {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroups) => (
                  <tr {...headerGroups.getHeaderGroupProps()}>
                    {headerGroups.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="text-center font-normal py-5 "
                      >
                        {" "}
                        {column.render("Header")}
                        {column.isSorted && (
                          <span>
                            {column.isSortedDesc ? (
                              <AiOutlineSortDescending className="inline-block" />
                            ) : (
                              <AiOutlineSortAscending className="inline-block" />
                            )}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="text-center border-b-2 border-b-gray-200 py-2"
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {pagination && (
          <div className="flex justify-center items-center p-5">
            <button
              disabled={!canPreviousPage}
              onClick={previousPage}
              className="bg-black text-white rounded-lg shadow px-3 py-2"
            >
              Previous
            </button>
            <span className="m-3 font-semibold">{`${
              pageIndex + 1
            } of ${pageCount}`}</span>
            <button
              disabled={!canNextPage}
              onClick={nextPage}
              className=" bg-black text-white rounded-lg shadow px-3 py-2"
            >
              Next
            </button>
          </div>
        )}
      </>
    );
  };
}

export default Table;
