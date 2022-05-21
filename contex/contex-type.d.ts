import { Dispatch, SetStateAction } from "react";

type cartProduct = {
  quantity: number;
  products: Product[] | null;
  price: number;
};
interface StatesReturnType {
  error: boolean;
  setError: (error: boolean) => void;
  alert: string | null;
  setAlert: Dispatch<SetStateAction<string | null>>;
  quantity: number;
  setQuantity: (quantity: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  orderInfo: OrderInfo | null;
  setOrderInfo: Dispatch<SetStateAction<OrderInfo | null>>;
}
interface CartReturnType {
  cartProduct: cartProduct;
  setCartProduct: Dispatch<SetStateAction<cartProduct>>;
  Add(productId: string, price: number): CartFnReturn;
  deleteCart: (id: string, price: number) => void;
  updateCart: (id: string, quantity: string) => void;
}
