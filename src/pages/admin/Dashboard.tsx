import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiMaleFemale } from "react-icons/bi";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { BarChart, DoughnutChart } from "../../components/admin/Common/Charts";
import DashboardTable from "../../components/admin/DashboardPage/DashboardTable";
import { getMonths } from "../../components/utils/features";
import { auth } from "../../firebase";
import { useGetDashboardStatsQuery } from "../../redux/api/dashboardApi";
import { RootState } from "../../redux/store";
import { DashboardStats } from "../../types/ApiTypes";

const initialState = {
  percentageChange: { users: "", products: "", orders: "", revenue: "" },
  count: { users: "", products: "", orders: "", revenue: "" },
  inventory: [],
  chart: {
    order: [],
    revenue: [],
  },
  userRatio: {
    male: 0,
    female: 0,
  },
  latestTransactions: [],
};
const { lastSixMonths } = getMonths();
function Dashboard() {
  const [dashboardStats, setDashboardStats] =
    useState<DashboardStats>(initialState);
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError } = useGetDashboardStatsQuery(user?._id!);
  if (isError) return toast.error("Unable to load dashboard data");

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign out successfully");
    } catch (error) {
      toast.error("Unable to sign out");
    }
  };

  useEffect(() => {
    if (data) {
      setDashboardStats({
        percentageChange: data.stats.percentageChange,
        count: data.stats.count,
        inventory: data.stats.inventory,
        chart: data.stats.chart,
        userRatio: data.stats.userRatio,
        latestTransactions: data.stats.latestTransactions,
      });
    }
  }, [data]);


  return isLoading ? (
    <Loader />
  ) : (
    <div className="lg:col-span-4 sm:px-5 sm:py-4 p-2 overflow-y-scroll w-full">
      <div className="flex justify-between items-center mx-3">
        <h2 className="heading text-xl w-[100%]">Monthly statistics</h2>
        <div className="flex items-center justify-between">
          <img
            src={user?.photo}
            alt="user-image"
            className="w-[30px] h-[30px] rounded-[100%]"
          />
          <div className="text-2xl ml-4" onClick={logoutHandler}>
            <MdLogout />
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xsm:grid-cols-2">
        <WebsiteStats
          type="Revenue"
          value={dashboardStats.count.revenue.toString()}
          percentage={Number(dashboardStats.percentageChange.revenue)}
          color="rgb(180 83 9)"
        />
        <WebsiteStats
          type="Users"
          value={dashboardStats.count.users.toString()}
          percentage={Number(dashboardStats.percentageChange.users)}
          color="rgb(87, 224, 74)"
        />
        <WebsiteStats
          type="Transactions"
          value={dashboardStats.count.orders.toString()}
          percentage={Number(dashboardStats.percentageChange.orders)}
          color="rgb(44, 151, 222)"
        />
        <WebsiteStats
          type="Products"
          value={dashboardStats.count.products.toString()}
          percentage={Number(dashboardStats.percentageChange.products)}
          color="rgb(189, 177, 53)"
        />
      </div>

      {/* Charts and Inventory section  */}
      <section className="md:grid md:grid-cols-4 ">
        <div className="bg-white col-span-3 xsm:rounded xsm:shadow sm:px-8 sm:py-7 xsm:p-4 my-9 xsm:m-3 ">
          <div className="flex justify-center  items-center flex-col">
            <h5 className="heading">REVENUE & TRANSACTION (Past 6 months)</h5>
            <BarChart
              data_1={dashboardStats.chart.revenue}
              data_2={dashboardStats.chart.order}
              bg_color1="rgb(0,155,255)"
              bg_color2="rgb(53,162,235,0.8)"
              title_1="Revenue"
              title_2="Transaction"
              labels={lastSixMonths}
            />
          </div>
        </div>

        <div className="bg-white xsm:rounded xsm:shadow xl:px-3 lg:px-2  py-5 lg:m-3 m-3 md:mx-0">
          <h5 className="text-gray-400 tracking-widest text-md uppercase text-center">
            INVENTORY
          </h5>
          <div className="flex justify-around items-center my-4 flex-col">
            {dashboardStats.inventory.map((item, i) => {
              const [heading, value] = Object.entries(item)[0];
              return (
                <div className="w-full my-2" key={i}>
                  <InventoryItem category={heading} value={value} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="md:grid md:grid-cols-4 ">
        <div className="bg-white xsm:rounded xsm:shadow xl:px-3 xl:py-5 m-3 xl:block lg:hidden md:w-full xsm:w-[50%] xsm:mx-auto ">
          <h5 className="heading">GENDER RATIO</h5>
          <div className="relative">
            <DoughnutChart
              labels={Object.keys(dashboardStats.userRatio)}
              data={Object.values(dashboardStats.userRatio)}
              backgroundColor={["red", "green"]}
              cutout="80%"
            />
            <BiMaleFemale className="absolute left-0 right-0 mx-auto top-0 bottom-0 my-auto text-3xl" />
          </div>
        </div>
        <div className="lg:col-span-4 xl:col-span-3 md:col-span-3 m-3 xsm:rounded xsm:shadow bg-white xsm:overflow-hidden overflow-x-scroll">
          <DashboardTable data={dashboardStats.latestTransactions} />
        </div>
      </div>
    </div>
  );
}

interface Stats {
  type: string;
  value: string;
  percentage: number;
  color: string;
}

const WebsiteStats = ({ type, value, percentage, color }: Stats) => {
  // inset -5px -5px 9px rgba(230, 230, 230,0.5), inset 5px 5px 9px rgb(230, 230, 230,0.5);
  return (
    <div className="flex items-center justify-between bg-white rounded  xsm:shadow shadow-2xl shadow-slate-300  px-3 py-5 m-3 overflow-x-auto">
      <div className="p-2">
        <h5 className=" text-gray-400">{type}</h5>
        <div className="text-2xl font-bold my-1">{value}</div>
        <div className="flex items-center">
          {percentage > 0 ? (
            <HiTrendingUp className="text-green-500" />
          ) : (
            <HiTrendingDown className="text-red-500" />
          )}
          <div className={`text-${percentage > 0 ? "green" : "red"}-500`}>
            {percentage > 0 ? `+${percentage}` : `${percentage}`}
          </div>
        </div>
      </div>
      <div
        className="h-[70px] w-[70px] rounded-[100%] flex justify-center items-center"
        style={{
          background: `conic-gradient(${color},${
            (Math.abs(percentage) / 100) * 360
          }deg,rgb(255, 255, 255) 0)`,
        }}
      >
        <div className="bg-white h-[80%] w-[80%] rounded-[100%] flex justify-center items-center">
          <div className={`text-${percentage > 0 ? "green" : "red"}-500`}>
            {percentage > 0 && `${percentage > 10000 ? 9999 : percentage}%`}
            {percentage < 0 && `${percentage < -10000 ? -9999 : percentage}%`}
          </div>
        </div>
      </div>
    </div>
  );
};

interface InventoryProps {
  category: string;
  value: number;
}

const InventoryItem = ({ category, value }: InventoryProps) => {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  return (
    // <div className="flex justify-around items-center my-4">
    //   <div className="text-xs">{category}</div>
    //   <div className="w-[50%] h-[5px] bg-gray-200 rounded">
    //     <div className="w-[40%] h-[5px] bg-red-400 rounded"></div>
    //   </div>
    //   <div className="text-xs">{value}%</div>
    // </div>
    <div className="flex w-full justify-around items-center">
      <div className="text-xs w-[20%]">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </div>
      <div className="w-[40%] h-[5px] bg-gray-200 rounded">
        <div
          className="h-[5px] rounded"
          style={{
            backgroundColor: randomColor,
            width: `${value}%`,
          }}
        ></div>
      </div>
      <div className="text-xs w-[20%]">{value}%</div>
    </div>
  );
};

export default Dashboard;
