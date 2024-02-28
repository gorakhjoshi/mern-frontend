import { ReactElement, useEffect, useState } from "react";
import { Column } from "react-table";
import { latestTransactions } from "../../../types/ApiTypes";
import Table from "../Common/Table";

interface ColumnsType {
  name: string;
  photo: ReactElement;
  amount: number;
  quantity: number;
  status: string;
}
/**
 * Creating Columns (Headers of table) array.
 * accessor is just a umique id of each header
 */
const columns: Column<ColumnsType>[] = [
  { Header: "Photo", accessor: "photo" },
  { Header: "Name", accessor: "name" },
  { Header: "Amount", accessor: "amount" },
  { Header: "Quantity", accessor: "quantity" },
  { Header: "Status", accessor: "status" },
];

function DashboardTable({ data }: { data: latestTransactions[] }) {

  const [rows, setRows] = useState<ColumnsType[]>([]);
  useEffect(() => {
    if (data) {
      setRows(
        data.map((i) => ({
          name: i.name,
          photo: (
            <img
              src={`${i.photo}`}
              className="w-[50px] h-[50px]"
            ></img>
          ),
          amount: i.amount,
          quantity: i.quantity,
          status: i.status,
        }))
      );
    }
  }, [data]);

  return Table<ColumnsType>(
    columns,
    rows,
    "px-3 py-5 m-3",
    "Latest Transaction"
  )();
}

export default DashboardTable;
