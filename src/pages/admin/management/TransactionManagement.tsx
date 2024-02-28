import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OrderedProductCard from "../../../components/OrderedProductCard";
import { responseToast } from "../../../components/utils/features";
import {
  useDeleteOrderMutation,
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderApi";
import { UserReducerInitialState } from "../../../types/ReducerTypes";
import { OrdersType } from "../../../types/types";
import Loader from "../../../components/Loader";

export type OrderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  _id: string;
};

export type OrderType = {
  customerName: string;
  address: string;
  city: string;
  country: string;
  state: string;
  pinCode: number;
  status: "Processing" | "Shipped" | "Delivered";
  subtotal: number;
  discount: number;
  shippingCharges: number;
  tax: number;
  total: number;
  orderItems: OrderItemType[];
  _id: string;
};

function TransactionManagement() {
  const defaultData: OrdersType = {
    shippingInfo: {
      address: "",
      city: "",
      pinCode: "",
      state: "",
      country: "",
    },
    subtotal: 0,
    shippingCharges: 0,
    tax: 0,
    discount: 0,
    total: 0,
    status: "",
    orderItems: [],
    _id: "",
    user: {
      name: "",
      _id: "",
    },
  };

  const [order, setOrder] = useState<OrdersType>();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { data, isLoading, isError } = useGetOrderDetailsQuery(id!);
  if (isError) toast.error("Unable to fetch order details");

  useEffect(() => {
    if (data) {
      setOrder({
        orderItems: data.order.orderItems,
        shippingInfo: data.order.shippingInfo,
        subtotal: data.order.subtotal,
        tax: data.order.tax,
        discount: data.order.discount,
        shippingCharges: data.order.shippingCharges,
        total: data.order.total,
        status: data.order.status,
        _id: data.order._id,
        user: data.order.user,
      });
    }
  }, [data]);
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const changeStatus = async () => {
    try {
      const res = await updateOrder({
        userId: user!._id,
        orderId: data!.order._id,
      });
      responseToast(res, navigate, "/admin/transactions");
    } catch (error) {
      toast.error("Failed to change the order status");
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const res = await deleteOrder({
        userId: user!._id,
        orderId: data!.order._id,
      });
      responseToast(res, navigate, "/admin/transactions");
    } catch (error) {
      toast.error("Failed to delete order");
    }
  };

  const {
    shippingInfo: { address, city, pinCode, state, country },
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    status,
    user: { name },
  } = order || defaultData;

  return isLoading ? (
    <Loader />
  ) : (
    <div className="lg:col-span-4 lg:place-self-center">
      <div className="flex justify-center lg:flex-row flex-col">
        <div className="bg-white lg:rounded lg:shadow xsm:px-5 px-2 py-8 lg:min-h-[90vh] lg:min-w-[400px] lg:mx-3">
          <h2 className="heading text-2xl">Order Items</h2>
          <div className="flex items-center justify-between flex-col my-5">
            {order?.orderItems.map((item) => {
              return (
                <OrderedProductCard
                  key={item._id}
                  name={item.name}
                  price={item.price}
                  photo={item.photo}
                  quantity={item.quantity}
                  productId={item.productId}
                  _id={item._id}
                />
              );
            })}
          </div>
        </div>
        <div className="bg-white lg:rounded lg:shadow px-5 py-8 min-h-[90vh] lg:max-w-[400px] lg:mx-3">
          <h2 className="heading text-2xl">Order Info</h2>
          <div className="my-5 px-2 text-md space-y-2">
            <h5 className="font-semibold text-lg">User Info</h5>
            <div className="px-2 lg:block flex justify-between xsm:flex-row flex-col">
              <p>Name: {name}</p>
              <p>
                Adderess:{" "}
                {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
              </p>
            </div>
            <h5 className="font-semibold text-lg">Amount Info</h5>
            <div className="px-2">
              <p>
                Subtotal: <span className="float-right
                ">{subtotal}</span>
              </p>
              <p>
                Shiping Charges: <span className="float-right
                ">{shippingCharges}</span>
              </p>
              <p>
                Tax: <span className="float-right
                ">{tax} </span>
              </p>
              <p>
                Discount: <span className="float-right text-red-500
                ">{discount}</span>
              </p>
              <p>
                Total: <span className="float-right
                ">{total}</span>
              </p>
            </div>
            <h5 className="font-semibold text-lg">Status Info</h5>
            <div className="px-2">
              {" "}
              <p>Status: {status}</p>
            </div>
          </div>

          <button className="btn-primary" onClick={changeStatus}>
            Process Status
          </button>
          <button
            className="btn-primary bg-red-600 mt-0"
            onClick={handleDeleteOrder}
            type="button"
          >
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionManagement;
