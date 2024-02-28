import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNewOrderMutation } from "../redux/api/orderApi";
import { NewOrder } from "../types/ApiTypes";
import { resetCart } from "../redux/reducer/cartReducer";
import { responseToast } from "../components/utils/features";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
// console.log(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
    shippingInfo,
  } = useSelector((state: RootState) => state.cartReducer);

  const { user } = useSelector((state: RootState) => state.userReducer);

  const [newOrder] = useNewOrderMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const orderData: NewOrder = {
      shippingInfo,
      user: user?._id!,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      orderItems: cartItems,
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    // const { paymentIntent, error } = await stripe.retrievePaymentIntent(
    //   "pi_3Of4TQSEw55mHWf61npEhF7a_secret_s2KwRdyV3ybPgsb4HqIicbKE9"
    // );

    console.log(paymentIntent, error);

    if (error) {
      console.log(error);

      setIsProcessing(false);
      return toast.error(error.message || "Something went wrong");
    }
    if (paymentIntent.status === "succeeded") {
      const res = await newOrder(orderData);
      dispatch(resetCart());
      responseToast(res, navigate, "/myorders");
    }
    setIsProcessing(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-center text-4xl my-5">Pay to Proceed </h1>
      <div className="sm:w-[24rem] sm:mx-auto mx-5">
        <PaymentElement className="" />
        <button
          type="submit"
          disabled={isProcessing}
          className="bg-black text-white w-full rounded py-1 my-3"
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </div>
    </form>
  );
};
function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const clientSecret: string | undefined = location.state;
  if (!clientSecret) return <Navigate to={"/shipping"} />;
  const options = {
    clientSecret,
  };
  const { user } = useSelector((state: RootState) => state.userReducer);
  useEffect(() => {
    if (!user) {
      toast.error("Please login first!");
      return navigate("/login");
    }
  }, [user]);

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
