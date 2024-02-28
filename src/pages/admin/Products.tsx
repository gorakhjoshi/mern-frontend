import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import Loader from "../../components/Loader";
import Table from "../../components/admin/Common/Table";
import { useAllProductsQuery } from "../../redux/api/productApi";
import { UserReducerInitialState } from "../../types/ReducerTypes";

interface ColumnsType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<ColumnsType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  { Header: "Name", accessor: "name" },
  { Header: "Price", accessor: "price" },
  { Header: "Stock", accessor: "stock" },
  { Header: "Action", accessor: "action" },
];

function Products() {
  const [rows, setRows] = useState<ColumnsType[]>([]);
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { data, isError, isLoading } = useAllProductsQuery(user!._id);
  if (isError) toast.error("Couldn't find products");

  useEffect(() => {
    if (data)
      setRows(
        data?.products.map((item) => ({
          photo: (
            <img
              src={`${item.photo.url}`}
              alt="product-image"
              className="w-[60px] h-[60px] object-contain mx-auto"
            />
          ),
          name: item.name,
          price: Number(item.price),
          stock: Number(item.stock),
          action: (
            <Link to={`/admin/product/${item._id}`} className="text-3xl">
              <CiEdit className="mx-auto" />
            </Link>
          ),
        }))
      );
  }, [data]);

  const ProductsTable = Table<ColumnsType>(
    columns,
    rows,
    "px-3 py-5 m-3",
    "Products",
    rows.length > 6,
    true
  )();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="lg:col-span-4 px-5 py-4 w-full">
      <div className="mx-3 xsm:rounded xsm:shadow xsm:bg-white relative">
        {ProductsTable}
        {/* <div className="absolute top-5 right-5 rounded-[100%] bg-black text-white py-1 px-3 text-2xl ">+</div> */}
        <Link
          className="absolute top-8 right-5 bg-black text-white rounded px-3 py-2 font-semibold"
          to="new"
        >
          Add More
        </Link>
      </div>
    </div>
  );
}

export default Products;
