import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./index.css";

import { onAuthStateChanged } from "firebase/auth";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./components/admin/Sidebar/AdminPanel";
import { auth } from "./firebase";
import { getUser } from "./redux/api/userApi";
import { userExist, userNotExist } from "./redux/reducer/userReduces";
import { UserReducerInitialState } from "./types/ReducerTypes";

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Transactions = lazy(() => import("./pages/admin/Transactions"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Products = lazy(() => import("./pages/admin/Products"));
const NewProduct = lazy(() => import("./pages/admin/management/NewProduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/ProductManagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/TransactionManagement")
);
const SalesReport = lazy(() => import("./pages/admin/charts/SalesReports"));
const ProductsStats = lazy(() => import("./pages/admin/charts/ProductsStats"));
const YearlyReport = lazy(() => import("./pages/admin/charts/YearlyReports"));
const Coupons = lazy(() => import("./pages/admin/Coupons"));

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const Login = lazy(() => import("./pages/Login"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const location = useLocation();
  const isAdminRoute: boolean = location.pathname.includes("/admin");
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );  

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
        console.log("logged in");
      } else {
        dispatch(userNotExist());
        console.log("not logged in");
      }
    });
  }, []);
  return loading ? (
    <Loader/>
  ) : (
    <div
      className={`${
        isAdminRoute
          ? "xsm:bg-stone-100 lg:grid lg:grid-cols-5 lg:h-[100vh] w-full"
          : ""
      }`}
    >
      {isAdminRoute ? <AdminPanel /> : <Navbar user={user} />}
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Admin  Routes  */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminOnly={true}
                isAdmin={user?.role == "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />}></Route>
            <Route path="/admin/products" element={<Products />}></Route>
            <Route path="/admin/customers" element={<Customers />}></Route>
            <Route
              path="/admin/transactions"
              element={<Transactions />}
            ></Route>
            <Route
              path="/admin/transactions"
              element={<Transactions />}
            ></Route>
            <Route path="/admin/products/new" element={<NewProduct />}></Route>
            <Route
              path="/admin/product/:id"
              element={<ProductManagement />}
            ></Route>
            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            ></Route>

            {/* Charts */}
            <Route path="/admin/sales-reports" element={<SalesReport />}></Route>
            <Route path="/admin/products-stats" element={<ProductsStats />}></Route>
            <Route
              path="/admin/yearly-reports"
              element={<YearlyReport />}
            ></Route>

            {/* Coupon  */}
            <Route path="/admin/coupons" element={<Coupons />}></Route>
          </Route>
          {/* User Routes  */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/products" element={<AllProducts />}></Route>
          <Route path="/shipping" element={<Shipping />}></Route>
          <Route path="/pay" element={<Checkout />}></Route>
          <Route path="/myorders" element={<MyOrders />}></Route>
          {/* Auth Routes  */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
