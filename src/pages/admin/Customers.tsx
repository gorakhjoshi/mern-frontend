import { ReactElement, useEffect, useState } from "react";
import { Column } from "react-table";
import Table from "../../components/admin/Common/Table";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  useChangeUserRoleMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "../../redux/api/userApi";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { responseToast } from "../../components/utils/features";
import { GrUserAdmin } from "react-icons/gr";

interface ColumnsType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
  changeRole: ReactElement;
}

const columns: Column<ColumnsType>[] = [
  { Header: "Avatar", accessor: "avatar" },
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "email" },
  { Header: "Gender", accessor: "gender" },
  { Header: "Role", accessor: "role" },
  { Header: "Change Role", accessor: "changeRole" },
  { Header: "Action", accessor: "action" },
];

function Customers() {
  const [rows, setRows] = useState<ColumnsType[]>([]);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isError, isLoading } = useGetAllUserQuery(user!._id);
  if (isError) return toast.error("Unable to fetch user accounts");

  const [deleteUser] = useDeleteUserMutation();
  const [changeUserRole] = useChangeUserRoleMutation();
  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await deleteUser({ userId, adminId: user!._id });
      responseToast(res, null, "");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeRole = async (userId: string) => {
    try {
      const res = await changeUserRole({ userId, adminId: user!._id });
      responseToast(res, null, "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((item) => {
          return {
            avatar: (
              <img
                style={{
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                }}
                src={item.photo}
                alt={item.name}
                className="mx-auto"
              />
            ),
            name: item.name,
            email: item.email,
            gender: item.gender,
            role: item.role,
            changeRole: (
              <button
                onClick={() => {
                  handleChangeRole(item._id);
                }}
                className="text-xl"
              >
                <GrUserAdmin />
              </button>
            ),
            action: (
              <button
                onClick={() => {
                  handleDeleteUser(item._id);
                }}
              >
                <FaTrash />
              </button>
            ),
          };
        })
      );
    }
  }, [data]);

  const CustomersTable = Table<ColumnsType>(
    columns,
    rows,
    "px-3 py-5 m-3",
    "Customers",
    rows.length > 6,
    true
  )();
  return isLoading ? (
    <Loader />
  ) : (
    <div className="lg:col-span-4 px-5 py-4">
      <div className="mx-3 xsm:rounded xsm:shadow xsm:bg-white">
        {CustomersTable}
      </div>
    </div>
  );
}

export default Customers;
