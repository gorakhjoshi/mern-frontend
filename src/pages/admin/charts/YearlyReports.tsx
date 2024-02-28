import { useSelector } from "react-redux";
import { LineChart } from "../../../components/admin/Common/Charts";
import { getMonths } from "../../../components/utils/features";
import { RootState } from "../../../redux/store";
import { useGetYearlyReportQuery } from "../../../redux/api/dashboardApi";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader";


const { lastTwelveMonths } = getMonths();
function YearlyReport() {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading, isError } = useGetYearlyReportQuery(user?._id!);
  if (isError) return toast.error("Unable to Yearly Report");
  const discount = data?.yearlyReports.discount || [];
  const products = data?.yearlyReports.products || [];
  const users = data?.yearlyReports.users || [];
  const revenue = data?.yearlyReports.revenue || [];


  return isLoading ? (
    <Loader />
  ) : (
    <div className="col-span-4 overflow-y-scroll">
      <div className="bg-white col-span-3 xsm:rounded xsm:shadow sm:px-8 sm:py-7 p-4 xsm:m-3 sm:m-6 space-y-6">
        <h1 className="text-center text-2xl font-semibold">Yearly Reports</h1>
        <div>
          <LineChart
            data={users}
            label="Users"
            borderColor="rgb(53, 162, 255)"
            backgroundColor="rgba(53, 162, 255,0.5)"
            labels={lastTwelveMonths}
          />
          <h2 className="heading my-5">Number of Users</h2>
        </div>
        <div>
          <LineChart
            data={products}
            backgroundColor={"hsla(269,80%,40%,0.4)"}
            borderColor={"hsl(269,80%,40%)"}
            label="Products"
            labels={lastTwelveMonths}
          />
          <h2 className="heading my-5">Total Products (SKU)</h2>
        </div>
        <div>
          <LineChart
            data={revenue}
            backgroundColor={"hsla(129,80%,40%,0.4)"}
            borderColor={"hsl(129,80%,40%)"}
            label="Revenue"
            labels={lastTwelveMonths}
          />
          <h2 className="heading my-5">Total Revenue</h2>
        </div>
        <div>
          <LineChart
            data={discount}
            backgroundColor={"hsla(29,80%,40%,0.4)"}
            borderColor={"hsl(29,80%,40%)"}
            label="Discount"
            labels={lastTwelveMonths}
          />
          <h2 className="heading my-5">Discount Allotted</h2>
        </div>
      </div>
    </div>
  );
}

export default YearlyReport;
