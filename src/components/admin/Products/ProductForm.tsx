import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useAddNewProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../../redux/api/productApi";
import { server } from "../../../redux/store";
import { UserReducerInitialState } from "../../../types/ReducerTypes";
import { responseToast } from "../../utils/features";
import Input from "../Common/Input";

interface ProductProps {
  name?: string;
  price?: number;
  stock?: number;
  photo?: string;
  category?: string;
  file?: File;
  btnText?: string;
  productId?: string;
}
function ProductForm({
  name,
  price,
  stock,
  photo,
  category,
  btnText,
  productId,
}: ProductProps) {
  const navigate = useNavigate();
  const [values, setValues] = useState<ProductProps>({
    name: name || "",
    price: price || 0,
    stock: stock || 0,
    photo: photo || "",
    category: category || "",
  });
  const [addNewProuduct] = useAddNewProductMutation();

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "stock" || e.target.name == "price") {
      setValues({ ...values, [e.target.name]: Number(e.target.value) });
    } else if (e.target.name == "photo") {
      const file: File | undefined = e.target.files?.[0];
      // setValues({ ...values, file: file });
      const reader: FileReader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          if (typeof reader.result === "string")
            try {
              setValues({
                ...values,
                [e.target.name]: reader.result,
                file: file,
              });
            } catch (error) {
              console.log(error);
            }
        };
      }
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };
  const handleCreateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", values.name!);
    formData.append("price", String(values.price!));
    formData.append("stock", String(values.stock!));
    formData.append("category", values.category!);
    formData.append("photo", values.file!);
    try {
      const res = await addNewProuduct({
        id: user!._id,
        formData,
      });
      responseToast(res, navigate, "/admin/products");
    } catch (error) {
      toast.error("Couldn't add a product");
    }
  };

  const handleUpdateProduct = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const product = new FormData();
    if (values.name) product.append("name", values.name);
    product.append("price", String(values.price));
    product.append("stock", String(values.stock));
    if (values.category) product.append("category", values.category);
    if (values.file) product.append("photo", values.file);

    try {
      const res = await updateProduct({
        userId: user!._id,
        productId: productId!,
        product,
      });
      responseToast(res, navigate, "/admin/products");
    } catch (error) {
      toast.error("Failed to update product details");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const res = await deleteProduct({
        userId: user!._id,
        productId: productId!,
      });
      responseToast(res, navigate, "/admin/products");
    } catch (error) {
      toast.error("Product not deleted");
    }
  };

  return (
    <form onSubmit={handleCreateProduct}>
      <div className="flex justify-center flex-col w-full xsm:min-w-[400px] lg:min-w-min">
        <Input
          type="text"
          id="name"
          name="name"
          isRequired={productId ? false : true}
          value={values.name}
          labelText="Name"
          classesForLabel="block my-2"
          classesForInput="rounded border border-solid px-3 py-2 w-full"
          placeholder="Enter product name"
          handleChange={handleChange}
        />
        <Input
          type="text"
          id="price"
          name="price"
          isRequired={productId ? false : true}
          value={values.price}
          labelText="Price (&#8377;)"
          classesForLabel="block my-2"
          classesForInput="rounded border border-solid px-3 py-2 w-full"
          placeholder="Enter price name"
          handleChange={handleChange}
        />
        <Input
          type="text"
          id="stock"
          name="stock"
          isRequired={productId ? false : true}
          value={values.stock}
          labelText="Stock"
          classesForLabel="block my-2"
          classesForInput="rounded border border-solid px-3 py-2 w-full"
          handleChange={handleChange}
          placeholder="Enter stock name"
        />
        <Input
          type="text"
          id="category"
          name="category"
          isRequired={productId ? false : true}
          value={values.category}
          labelText="Category"
          classesForLabel="block my-2"
          classesForInput="rounded border border-solid px-3 py-2 w-full"
          placeholder="Enter product category"
          handleChange={handleChange}
        />

        <Input
          type="file"
          id="photo"
          name="photo"
          labelText="Photo"
          classesForLabel="block my-2"
          classesForInput="rounded border border-solid px-3 py-2 w-full"
          handleChange={handleChange}
        />

        {!productId && values.photo && (
          <div className="w-full">
            <img
              src={productId ? `${server}/${photo}` : values.photo}
              alt="product-image"
              className="w-[150px] h-[150px] object-fit block mx-auto"
            />
          </div>
        )}
        {!productId && <button className="btn-primary">{btnText}</button>}
        {productId && (
          <button
            type="button"
            className="btn-primary"
            onClick={handleUpdateProduct}
          >
            {btnText}
          </button>
        )}
        {productId && (
          <button
            className="btn-primary bg-red-600 mt-0"
            onClick={handleDeleteProduct}
            type={productId ? "button" : "submit"}
          >
            Delete Product
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
