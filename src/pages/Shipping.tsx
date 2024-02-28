import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/ReducerTypes";
import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import Input from "../components/admin/Common/Input";
import { IoArrowBackSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";
import { RootState, server } from "../redux/store";
import { ShippingInfo } from "../types/types";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

function Shipping() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState<ShippingInfo>();
  const { cartItems, total } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  const { user } = useSelector((state: RootState) => state.userReducer);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values!, [e.target.name]: e.target.value });
  };

  const proceedToPayment = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (
      !values?.address ||
      !values.state ||
      !values.city ||
      !values.country ||
      !values.pinCode
    )
      return toast.error("Please fill all the fields to proceed");
    try {
      const { data } = await axios.post(
        `${server}/api/v1/payments/create?id=${user?._id!}`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(saveShippingInfo(values!));
      navigate("/pay/", {
        state: data.clientSecret,
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (!user) {
      toast.error("Please login first!");
      return navigate("/login");
    }
    if (cartItems.length <= 0) {
      toast.error("Cart is empty");
      return navigate("/cart");
    }
  }, [cartItems, user]);
  return (
    <div className="mt-[90px] relative">
      <div
        className="text-white bg-black rounded-[100%] absolute p-3 top-0 left-5 text-lg hidden sm:block"
        onClick={() => {
          navigate("/cart");
        }}
      >
        <IoArrowBackSharp />
      </div>
      <h2 className="heading text-2xl">Shipping Adderess</h2>
      <form className="mx-5">
        <div className="flex flex-col space-y-4 sm:w-[24rem] justify-center mx-auto my-8">
          <Input
            type="text"
            id="address"
            name="address"
            value={values?.address}
            classesForInput="border p-1 border-black rounded"
            placeholder="Address"
            isRequired={true}
            handleChange={handleChange}
          />
          <Input
            type="text"
            id="city"
            name="city"
            value={values?.city}
            classesForInput="border p-1 border-black rounded"
            placeholder="City"
            isRequired={true}
            handleChange={handleChange}
          />

          <select
            name="country"
            id="country"
            value={values?.country}
            className="border p-1 border-black rounded"
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            <option value="india">India</option>
          </select>
          <Input
            type="text"
            id="state"
            name="state"
            value={values?.state}
            classesForInput="border p-1 border-black rounded"
            placeholder="State"
            isRequired={true}
            handleChange={handleChange}
          />
          <Input
            type="text"
            id="pinCode"
            name="pinCode"
            value={values?.pinCode}
            classesForInput="border p-1 border-black rounded"
            placeholder="Pin Code"
            isRequired={true}
            handleChange={handleChange}
          />
          <button
            className="text-white bg-black rounded py-2 text-md"
            onClick={proceedToPayment}
          >
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
}

export default Shipping;
