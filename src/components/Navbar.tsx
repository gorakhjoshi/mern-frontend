import { signOut } from "firebase/auth";
import { ReactElement } from "react";
import toast from "react-hot-toast";
import { IoMdCart } from "react-icons/io";
import { MdLogin, MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { CartReducerInitialState } from "../types/ReducerTypes";
import { User } from "../types/types";

function Navbar({ user }: { user: User | null }) {
  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign out successfully");
    } catch (error) {
      toast.error("Unable to sign out");
    }
  };
  return (
    <>
      {/* {phoneActive && (
        <div className="block h-[50px]">
          <div className="block w-full bg-white p-2 fixed z-40">
            <HiMenuAlt4
              className="rounded-[100%] bg-white text-4xl"
              onClick={handleClick}
            />
          </div>
        </div>
      )} */}

      <div className="w-full flex justify-between bg-white h-[80px] fixed z-50 top-0">
        <img
          src="https://shopo.quomodothemes.website/assets/images/logo.svg"
          alt="logo"
          className="mx-3 my-4 md:block hidden"
        />
        <ul className="flex items-center md:justify-end justify-evenly w-full">
          <Li className="sm:p-2 xsm:m-2" text="Home" url="/" />
          <Li className="sm:p-2 xsm:m-2" text="Products" url="/products" />
          <Li className="sm:p-2 xsm:m-2" text="My orders" url="/myorders" />
          {user && user.role == "admin" ? (
            <Li
              className="sm:p-2 xsm:m-2"
              text="Dashboard"
              url="/admin/dashboard"
            />
          ) : (
            ""
          )}
          <Li
            className="sm:p-2 xsm:m-2 text-2xl relative"
            text={<IoMdCart />}
            url="/cart"
            cartNumber={cartItems.length}
          />
          {user ? (
            <Li
              className="sm:p-2 xsm:m-2 text-2xl"
              text={<MdLogout />}
              url=""
              handleClick={logoutHandler}
            />
          ) : (
            <Li className="sm:p-2 xsm:m-2 text-2xl" text={<MdLogin />} url="/login" />
          )}
        </ul>
      </div>
    </>
  );
}

interface LiProps {
  className: string;
  text: string | ReactElement;
  url: string;
  cartNumber?: number;
  handleClick?: React.MouseEventHandler<HTMLLIElement>;
}
const Li = ({ className, text, url, cartNumber, handleClick }: LiProps) => {
  return (
    <li className={className} onClick={handleClick}>
      {cartNumber && url === "/cart" ? (
        <div className="bg-red-500 text-white rounded-[100%] w-fit px-1 text-xs absolute top-0 right-0">
          {cartNumber}
        </div>
      ) : (
        ""
      )}
      <Link to={url}>{text}</Link>
    </li>
  );
};

export default Navbar;
