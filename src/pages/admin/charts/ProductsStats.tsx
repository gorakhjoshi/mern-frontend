import {
  DoughnutChart,
  PieChart,
} from "../../../components/admin/Common/Charts";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useGetProductsStatsQuery } from "../../../redux/api/dashboardApi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { ProductsStats } from "../../../types/ApiTypes";
import Loader from "../../../components/Loader";

const initialState = {
  Orders: {
    processing: 0,
    shipped: 0,
    delivered: 0,
  },
  inventory: [],
  stock: {
    inStock: 0,
    outOfStock: 0,
  },
  revenueDistribution: {
    netMargin: 0,
    discount: 0,
    productionCost: 0,
    burnt: 0,
    marketingCost: 0,
  },
  userAgeGroups: {
    teen: 0,
    adult: 0,
    old: 0,
  },
  userRoles: {
    admin: 0,
    customer: 0,
  },
};

function ProductsStats() {
  const [productStats, setProductsStats] =
    useState<ProductsStats>(initialState);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading, isError } = useGetProductsStatsQuery(user?._id!);
  if (isError) return toast.error("Unable to load products stats");

  useEffect(() => {
    if (data) {
      setProductsStats({
        Orders: data.productStats.Orders,
        inventory: data.productStats.inventory,
        stock: data.productStats.stock,
        revenueDistribution: data.productStats.revenueDistribution,
        userAgeGroups: data.productStats.userAgeGroups,
        userRoles: data.productStats.userRoles,
      });
    }
  }, [data]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="lg:col-span-4 overflow-y-scroll">
      <div className="bg-white col-span-3 xsm:rounded xsm:shadow px-8 py-7 m-6 space-y-6">
        <h1 className="text-center text-2xl font-semibold">
          Products Statistics
        </h1>
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div>
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[
                productStats.Orders.processing,
                productStats.Orders.shipped,
                productStats.Orders.delivered,
              ]}
              backgroundColor={[
                `hsl(110,80%, 80%)`,
                `hsl(110,80%, 50%)`,
                `hsl(110,40%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
            <h2 className="heading">Order Fulfillment Ratio</h2>
          </div>

          <div>
            <DoughnutChart
              labels={productStats.inventory.map((i) => Object.keys(i)[0])}
              data={productStats.inventory.map((i) => Object.values(i)[0])}
              backgroundColor={productStats.inventory.map(
                (i) =>
                  `hsl(${Object.values(i)[0] * 4},${Object.values(i)[0]}%, 50%)`
              )}
              legends={false}
              offset={[0, 0, 0, 80]}
            />
            <h2 className="heading">Product Categories Ratio</h2>
          </div>

          <div>
            <DoughnutChart
              labels={["In Stock", "Out Of Stock"]}
              data={[productStats.stock.inStock, productStats.stock.outOfStock]}
              backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
              legends={false}
              offset={[0, 80]}
              cutout={"70%"}
            />
            <h2 className="heading">Stock Availability</h2>
          </div>

          <div>
            <DoughnutChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Burnt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[
                productStats.revenueDistribution.marketingCost,
                productStats.revenueDistribution.discount,
                productStats.revenueDistribution.burnt,
                productStats.revenueDistribution.productionCost,
                productStats.revenueDistribution.netMargin,
              ]}
              backgroundColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53, 162, 255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
            <h2 className="heading">Revenue Distribution</h2>
          </div>

          <div>
            <PieChart
              labels={[
                "Teenager(Below 20)",
                "Adult (20-40)",
                "Older (above 40)",
              ]}
              data={[
                productStats.userAgeGroups.teen,
                productStats.userAgeGroups.adult,
                productStats.userAgeGroups.old,
              ]}
              backgroundColor={[
                `hsl(10, ${80}%, 80%)`,
                `hsl(10, ${80}%, 50%)`,
                `hsl(10, ${40}%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
            <h2 className="heading">Users Age Group</h2>
          </div>

          <div>
            <DoughnutChart
              labels={["Admin", "Customers"]}
              data={[
                productStats.userRoles.admin,
                productStats.userRoles.customer,
              ]}
              backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[0, 80]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsStats;
