export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export interface User {
  name: string;
  email: string;
  dob: string;
  photo: string;
  _id: string;
  gender: string;
  role: string;
}

export interface ShippingInfo {
  address: string;
  city: string;
  pinCode: string;
  state: string;
  country: string;
}

export type CartItem = {
  productId: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
  stock: number;
};
export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type OrdersType = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  discount: number;
  shippingCharges: number;
  total: number;
  status: string;
  _id: string;
  user: {
    name: string;
    _id: string;
  };
};

export type ChangeInStats = {
  users: string | number;
  products: string | number;
  orders: string | number;
  revenue: string | number;
};

export type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};
