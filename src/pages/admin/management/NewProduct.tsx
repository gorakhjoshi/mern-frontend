import ProductForm from "../../../components/admin/Products/ProductForm";

function NewProduct() {
  return (
    <div className="lg:col-span-4 lg:place-self-center w-[28rem] mx-auto min-h-[100vh] flex justify-center items-center">
      <div className="xsm:bg-white xsm:rounded xsm:shadow p-5 xsm:min-h-[90vh] ">
        <h2 className="text-center font-bold text-3xl my-4">New Product</h2>
        <ProductForm btnText="Add Product" />
      </div>
    </div>
  );
}

export default NewProduct;
