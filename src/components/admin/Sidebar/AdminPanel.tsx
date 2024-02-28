import { useState } from "react";
import { IconType } from "react-icons";
import { BsGraphUp } from "react-icons/bs";
import { FaChartPie } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoBarChartSharp } from "react-icons/io5";
import { MdDashboard, MdOutlinePayment, MdShoppingCart } from "react-icons/md";
import { RiCouponLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function AdminPanel() {
  // const [phoneActive, setPhoneActive] = useState<boolean>(
  //   window.innerWidth < 1024
  // );
  const phoneActive = window.innerWidth < 1024;
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const checkMobileMenu = () => {
    if (phoneActive) setShowMenu(!showMenu);
  };
  return (
    <>
      {phoneActive && (
        <div className="block h-[50px]">
          <div className="block w-full bg-white p-2 fixed z-40">
            <HiMenuAlt4
              className="rounded-[100%] bg-white text-4xl"
              onClick={handleClick}
            />
          </div>
        </div>
      )}

      <div
        className={`${
          showMenu
            ? "fixed left-0 ease-in duration-500	w-[50%] z-10 h-[100vh]"
            : "hidden left-96"
        } lg:block bg-white px-5 py-4`}
      >
        {/* <h1 className="text-2xl font-bold">Logo.</h1> */}
        <img
          src="https://shopo.quomodothemes.website/assets/images/logo.svg"
          alt="logo"
          className="my-2"
        />
        <div className="xl:px-4 lg:px-2  py-6">
          <div>
            <h5 className="uppercase tracking-widest">DASHBOARD</h5>
            <div className="px-4 py-3">
              <ul>
                <Li
                  url="/admin/dashboard"
                  text="Dashboard"
                  Icon={MdDashboard}
                  handleClick={checkMobileMenu}
                />
                <Li
                  url="/admin/products"
                  text="Products"
                  Icon={MdShoppingCart}
                  handleClick={checkMobileMenu}
                />
                <Li
                  url="/admin/customers"
                  text="Customers"
                  Icon={FaUsersGear}
                  handleClick={checkMobileMenu}
                />
                <Li
                  url="/admin/transactions"
                  text="Transactions"
                  Icon={MdOutlinePayment}
                  handleClick={checkMobileMenu}
                />
              </ul>
            </div>
          </div>
        </div>
        <div className="xl:px-4 lg:px-2  py-6">
          <div>
            <h5 className="uppercase tracking-widest">CHARTS</h5>
            <div className="px-4 py-3">
              <ul>
                <Li
                  url="/admin/sales-reports"
                  text="Sales Reports"
                  Icon={IoBarChartSharp}
                  handleClick={checkMobileMenu}
                />
                <Li
                  url="/admin/products-stats"
                  text="Products Stats"
                  Icon={FaChartPie}
                  handleClick={checkMobileMenu}
                />
                <Li
                  url="/admin/yearly-reports"
                  text="Yearly Reports"
                  Icon={BsGraphUp}
                  handleClick={checkMobileMenu}
                />
              </ul>
            </div>
          </div>
          <Li
            url="/admin/coupons"
            text="Coupon"
            Icon={RiCouponLine}
            handleClick={checkMobileMenu}
          />
        </div>
        {showMenu && (
          <button
            className="w-full bg-black text-white rounded py-1"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            Close
          </button>
        )}
      </div>
    </>
  );
}

interface Liprops {
  url: string;
  text: string;
  Icon: IconType;
  handleClick?: React.MouseEventHandler<HTMLLIElement>;
}
const Li = ({ url, text, Icon, handleClick }: Liprops) => {
  return (
    <li
      className="xl:text-lg text-base flex items-center py-2"
      onClick={handleClick}
    >
      <Icon />
      <Link to={url} className="ml-2">
        {text}
      </Link>
    </li>
  );
};

export default AdminPanel;
