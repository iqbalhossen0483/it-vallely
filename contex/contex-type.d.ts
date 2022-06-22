import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

type cartProduct = {
  quantity: number;
  products: OrderedProducts[] | null;
  price: number;
};
type Alert = { msg: string; type: "info" | "success" | "error" | "warning" };

interface StatesReturnType {
  error: boolean;
  setError: (error: boolean) => void;
  alert: Alert;
  setAlert: Dispatch<SetStateAction<Alert>>;
  quantity: number;
  setQuantity: (quantity: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  orderInfo: OrderInfo | null;
  setOrderInfo: Dispatch<SetStateAction<OrderInfo | null>>;
  categories: string[];
  setCategories: Dispatch<SetStateAction<string[]>>;
  redirect: string;
  setRidirect: Dispatch<SetStateAction<string>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
}
interface CartReturnType {
  cartProduct: cartProduct;
  setCartProduct: Dispatch<SetStateAction<cartProduct>>;
  Add(productId: string, price: number): CartFnReturn;
  deleteCart: (id: string, price: number) => void;
  updateCart: (id: string, quantity: string) => void;
}

interface FirebaseReturn {
  googleSingIn: () => Promise<SignUpIn>;
  emailSignUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<emaiSignUP>;
  emailSingIn: (email: string, password: string) => Promise<SignUpIn>;
  user: User | null;
  singOut: () => Promise<{ error: boolean }>;
  varifyEmail: (user: User) => Promise<{ error: boolean }>;
  resetPassword: (email: string) => Promise<{ error: boolean }>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  userRole: UserRoles | null;
}
