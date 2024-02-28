import toast from "react-hot-toast";
import ProductCard from "../components/Products/ProductCard";
import {
  useGetAllCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import { useState } from "react";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";
import { addToCart, calculatePrice } from "../redux/reducer/cartReducer";

function AllProducts() {
  const dispatch = useDispatch();
  const { data } = useGetAllCategoriesQuery("");

  const [sort, setSortOrder] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const {
    data: allProducts,
    isError,
    isLoading: productsLoading,
  } = useSearchProductsQuery({
    sort,
    price,
    category,
    search,
    page,
  });
  if (isError) toast.error("Couldn't find products");
  const handleNextPageChange = () => {
    if (allProducts?.totalPages && page < allProducts.totalPages) {
      setPage(page + 1);
    }
  };
  const handlePrevPageChange = () => {
    if (allProducts?.totalPages && page > 1) {
      setPage(page - 1);
    }
  };

  const handleAddToCart = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");
    dispatch(addToCart(cartItem));
    dispatch(calculatePrice());
    toast.success("Added to cart");
  };

  return (
    <div className="lg:grid lg:grid-cols-4 mt-[90px]">
      <section className="p-4 mx-6 text-lg">
        <h2 className="heading text-left text-xl">Filters</h2>
        <div className="flex flex-col sm:flex-row lg:flex-col justify-between lg:items-stretch sm:items-center lg:space-y-4 text-base sm:text-lg">
          <div>
            <label htmlFor="sort" className="block">
              Sort:
            </label>
            <select
              name="sort"
              id="sort"
              className="border border-black rounded py-1 px-2 w-full"
              onChange={(e) => {
                setSortOrder(e.target.value);
              }}
            >
              <option value="">Select order</option>
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block">
              Price:
            </label>
            <input
              type="range"
              min={100}
              max={100000}
              name="price"
              id="price"
              className="w-full"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="category" className="block">
              Category:
            </label>
            <select
              name="category"
              id="category"
              className="border border-black rounded py-1 px-2 w-full"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="">Select Category</option>
              {data?.categories.map((value,index) => (
                <option value={value} key={index}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
      {productsLoading ? (
        <Loader />
      ) : (
        <section className="lg:col-span-3">
          <div className="px-4">
            <input
              type="text"
              className="border border-black p-1 rounded w-full"
              placeholder="Search for products"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-wrap justify-evenly max-h-[80vh] ">
            {allProducts?.products.map((item) => {
              return (
                <div key={String(item._id)} className="mx-4">
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
            })}
          </div>
          {allProducts!.totalPages > 1 ? (
            <div className="flex justify-center items-center">
              <button
                onClick={handlePrevPageChange}
                className="bg-black text-white rounded-lg shadow px-3 py-2"
                disabled={page === 1 ? true : false}
              >
                Previous
              </button>
              <span className="m-3 font-semibold">{`${page} of ${allProducts?.totalPages}`}</span>
              <button
                onClick={handleNextPageChange}
                className="bg-black text-white rounded-lg shadow px-3 py-2"
                disabled={page === allProducts?.totalPages ? true : false}
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </section>
      )}
    </div>
  );
}

export default AllProducts;
