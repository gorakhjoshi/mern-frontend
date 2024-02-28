import { useSelector } from "react-redux";
import { BarChart } from "../../../components/admin/Common/Charts";
import { getMonths } from "../../../components/utils/features";
import { RootState } from "../../../redux/store";
import { useGetSalesReportQuery } from "../../../redux/api/dashboardApi";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader";

const { lastSixMonths, lastTwelveMonths } = getMonths();

function SalesReport() {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading, isError } = useGetSalesReportQuery(user?._id!);
  if (isError) return toast.error("Unable to load Sales Report");
  
  const products = data?.salesReports.products || [];
  const orders = data?.salesReports.orders || [];
  const users = data?.salesReports.users || [];

  return isLoading ? (
    <Loader />
  ) : (
    <div className="lg:col-span-4 overflow-y-scroll">
      <div className="bg-white col-span-3 xsm:rounded xsm:shadow sm:px-8 sm:py-7 p-4 xsm:m-3 sm:m-6  space-y-6">
        <h2 className="font-bold text-3xl">Sales Reports</h2>
        <BarChart
          data_1={products}
          data_2={users}
          title_1="Products"
          title_2="Users"
          bg_color1={`hsl(260,50%,30%)`}
          bg_color2={`hsl(360,90%,90%)`}
          labels={lastSixMonths}
        />
        {/* <h2 className="heading">Top Selling Products & Top Customers</h2> */}
        <h2 className="heading">New Products and Customers</h2>

        <BarChart
          horizontal={true}
          data_1={orders}
          data_2={[]}
          title_1="Products"
          title_2=""
          bg_color1={`hsl(180, 40%, 50%)`}
          bg_color2=""
          labels={lastTwelveMonths}
        />
        <h2 className="heading">Orders throughout the year</h2>
      </div>
    </div>
  );
}

export default SalesReport;
