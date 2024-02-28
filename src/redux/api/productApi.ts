import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoriesType,
  MessageResponse,
  ProductsResponse,
  SearchProducts,
  SearchProductsResponse,
  AddNewProuduct,
  SingleProductResponse,
  UpdateProduct,
  DeleteProduct,
} from "../../types/ApiTypes";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/product`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<ProductsResponse, string>({
      query: () => "latest",
      providesTags: ["product"],
    }),
    allProducts: builder.query<ProductsResponse, string>({
      query: (id) => `adminProducts?id=${id}`,
      providesTags: ["product"],
    }),
    getAllCategories: builder.query<CategoriesType, string>({
      query: () => "categories",
      providesTags: ["product"],
    }),
    searchProducts: builder.query<SearchProductsResponse, SearchProducts>({
      query: ({ category, price, search, sort, page }) => {
        let baseUrl = `all?search=${search}&&page=${page}`;
        if (category) baseUrl += `&&category=${category}`;
        if (price) baseUrl += `&&price=${price}`;
        if (sort) baseUrl += `&&sort=${sort}`;
        return baseUrl;
      },
      providesTags: ["product"],
    }),
    getSingleProduct: builder.query<SingleProductResponse, string>({
      query: (id) => id,
      providesTags: ["product"],
    }),
    addNewProduct: builder.mutation<MessageResponse, AddNewProuduct>({
      query: ({ id, formData }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation<MessageResponse, UpdateProduct>({
      query: ({ product, userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation<MessageResponse, DeleteProduct>({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useGetAllCategoriesQuery,
  useSearchProductsQuery,
  useAddNewProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
