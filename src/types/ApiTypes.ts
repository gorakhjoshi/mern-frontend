import {
  CartItem,
  ChangeInStats,
  OrdersType,
  RevenueDistribution,
  ShippingInfo,
  User,
} from "./types";

export type MessageResponse = {
  success: boolean;
  message: string;
};
export type UserResponse = {
  success: boolean;
  user: User;
};
export type AllUserResponse = {
  success: boolean;
  users: User[];
};

export type DeleteUser = {
  userId: string;
  adminId: string;
};

export interface ProductType {
  _id: string;
  name: string;
  stock: number;
  photo: {
    public_id:string,
    url:string
  };
  category: string;
  price: number;
}

export type ProductsResponse = {
  success: boolean;
  products: ProductType[];
};

export type SingleProductResponse = {
  success: boolean;
  product: ProductType;
};

export interface CustomError {
  status: boolean;
  data: {
    success: boolean;
    message: string;
  };
}

export interface CategoriesType {
  success: boolean;
  categories: string[];
}

export interface SearchProducts {
  category?: string;
  price?: string;
  search?: string;
  sort?: string;
  page?: number;
}

export interface SearchProductsResponse extends ProductsResponse {
  totalPages: number;
}

export interface AddNewProuduct {
  id: string;
  formData: FormData;
}

export interface UpdateProduct {
  userId: string;
  productId: string;
  product: FormData;
}
export interface DeleteProduct {
  userId: string;
  productId: string;
}

export interface NewOrder {
  shippingInfo: ShippingInfo;
  user: string;
  subtotal: number;
  tax: number;
  discount: number;
  shippingCharges: number;
  total: number;
  orderItems: CartItem[];
}

export interface Product {}

export type SingleOrderResponse = {
  success: boolean;
  order: OrdersType;
};

export interface AllOrdersResponse {
  success: boolean;
  orders: OrdersType[];
}
export interface UpdateOrder {
  userId: string;
  orderId: string;
}

export interface latestTransactions {
  name: string;
  photo: string;
  amount: number;
  quantity: number;
  status: string;
}

export interface DashboardStats {
  percentageChange: ChangeInStats;
  count: ChangeInStats;
  inventory: Record<string, number>[];
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransactions: latestTransactions[];
}

export interface DashboardResponse {
  success: boolean;
  stats: DashboardStats;
}

export interface ProductsStats {
  Orders: {
    processing: number;
    shipped: number;
    delivered: number;
  };
  inventory: Record<string, number>[];
  stock: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;
  userAgeGroups: {
    teen: number;
    adult: number;
    old: number;
  };
  userRoles: {
    admin: number;
    customer: number;
  };
}

export interface ProductsStatsResponse {
  success: boolean;
  productStats: ProductsStats;
}

export interface SalesReport {
  products: number[];
  users: number[];
  orders: number[];
}
export interface SalesReportResponse {
  success: boolean;
  salesReports: SalesReport;
}

export interface YearlyReport {
  products: number[];
  users: number[];
  revenue: number[];
  discount: number[];
}
export interface YearlyReportResponse {
  success: boolean;
  yearlyReports: YearlyReport;
}

export interface GenerateCouponCode {
  coupon: string;
  amount: number;
}
