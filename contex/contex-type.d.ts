type cartProduct = {
  quantity: number;
  price: number;
};
interface StatesReturnType {
  error: boolean;
  setError: (prev: boolean) => void;
  alert: string | null;
  setAlert: (prev: string | null) => void;
}
interface CartReturnType {
  cartProduct: cartProduct;
  setCartProduct: (prev: cartProduct) => void;
  Add(productId: string, price: number): CartFnReturn;
}
