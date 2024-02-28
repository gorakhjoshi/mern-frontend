import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import bgImage from "../assets/bg-image1.png";
import Loader from "../components/Loader";
import ProductCard from "../components/Products/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productApi";
import { addToCart, calculatePrice } from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/ReducerTypes";
import { CartItem } from "../types/types";

function Home() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useLatestProductsQuery("");

  if (isError) toast.error("Couldn't load products.");

  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );

  const handleAddToCart = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");
    let result;
    if (cartItems) {
      result = cartItems.find((i) => i.productId === cartItem.productId);
    }

    if (result) {
      toast(() => (
        <span>
          <strong>Already added to the cart!</strong>
        </span>
      ));
    } else {
      dispatch(addToCart(cartItem));
      dispatch(calculatePrice());
      toast.success("Added to cart");
    }
  };

  return (
    <div className="mt-[90px]">
      {/* background image  */}
      <div className="w-full h-[650px]">
        <img
          src={bgImage}
          alt="bg-image"
          className="w-full object-contain h-full"
        />
      </div>
      <div></div>
      <section></section>
      {/* Products  */}
      <main className="m-4 px-4 py-2">
        <div className="flex items-center justify-between">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <h1 className="heading text-2xl">Latest Products</h1>
              <Link to="/products" className="text-lg hidden xsm:inline">
                More
              </Link>
            </>
          )}
        </div>

        <div
          className={`w-full flex justify-center ${
            !isLoading && data!.products.length > 3 ? "xl:justify-between" : ""
          } items-center flex-wrap`}
        >
          {isLoading ? (
            <Loader />
          ) : (
            data?.products.map((item) => {
              return (
                <div key={String(item._id)}>
                  <ProductCard
                    name={item.name}
                    price={item.price}
                    stock={item.stock}
                    image={item.photo.url}
                    id={String(item._id)}
                    handleClick={() => {
                      handleAddToCart({
                        productId: item._id,
                        name: item.name,
                        price: item.price,
                        photo: item.photo.url,
                        quantity: 1,
                        stock: item.stock,
                      });
                    }}
                  />
                </div>
              );
            })
          )}
        </div>
      </main>
      {/* <footer className="w-full bg-stone-50 text-center p-2 text-xl tracking-wider">All rights reserved @ 2024</footer> */}
    </div>
  );
}

export default Home;
