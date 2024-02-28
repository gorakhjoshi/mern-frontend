import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import Loader from "../components/Loader";
import Table from "../components/admin/Common/Table";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import { RootState } from "../redux/store";
import { CustomError } from "../types/types";

interface ColumnsType {
  photo: ReactElement;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
}

const columns: Column<ColumnsType>[] = [
  {
    Header: "Image",
    accessor: "photo",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

function MyOrders() {
  let orders:ColumnsType[] = [];
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id!);

  const [rows, setRows] = useState<ColumnsType[]>([]);

  if (isError) {
    const err = error as CustomError;

    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      data?.orders.forEach((i) => {
        if (i.orderItems.length > 1) {
          i.orderItems.forEach((item) => {
            orders.push({
              photo: <img src={`${item.photo}`} className="w-[50px] h-[50px] object-contain mx-auto"></img>,
              amount: Math.round(item.price + item.price * 0.18),
              discount: i.discount,
              quantity: item.quantity,
              status: (
                <span
                  className={
                    i.status === "Processing"
                      ? "text-red-500"
                      : i.status === "Shipped"
                      ? "text-green-500"
                      : "text-purple-500"
                  }
                >
                  {i.status}
                </span>
              ),
            });
          });
        } else {
          orders.push({
            photo: <img src={`${i.orderItems[0].photo}`} className="w-[50px] h-[50px] object-contain mx-auto"></img>,
            amount: i.total,
            discount: i.discount,
            quantity: i.orderItems[0].quantity,
            status: (
              <span
                className={
                  i.status === "Processing"
                    ? "text-red-500"
                    : i.status === "Shipped"
                    ? "text-green-500"
                    : "text-purple-500"
                }
              >
                {i.status}
              </span>
            ),
          });
        }
      });
    // setRows(
    //   data!.orders.map((i) => ({
    //     _id: i._id,
    //     amount: i.subtotal + i.tax,
    //     discount: i.discount,
    //     quantity: i.orderItems.length,
    //     status: (
    //       <span
    //         className={
    //           i.status === "Processing"
    //             ? "text-red-500"
    //             : i.status === "Shipped"
    //             ? "text-green-500"
    //             : "text-purple-500"
    //         }
    //       >
    //         {i.status}
    //       </span>
    //     ),
    //   }))
    // );

    setRows(orders)
  }, [data]);

  const OrdersTable = Table<ColumnsType>(
    columns,
    rows,
    "px-3 py-5 m-3",
    "My orders",
    rows.length > 6,
    rows.length > 6
  )();

  return (
    <div className="lg:col-span-4 px-5 py-4 w-full mt-[90px]">
      <div className="mx-3 relative">
        {isLoading ? <Loader /> : OrdersTable}
        {/* <div className="absolute top-5 right-5 rounded-[100%] bg-black text-white py-1 px-3 text-2xl ">+</div> */}
      </div>
    </div>
  );
}

export default MyOrders;
