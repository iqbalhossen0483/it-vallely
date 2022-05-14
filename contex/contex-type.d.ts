type cartProduct = {
  quantity: number;
  price: number;
};
interface StatesReturnType {
  error: boolean;
  setError: (error: boolean) => void;
  alert: string | null;
  setAlert: (text: string | null) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}
interface CartReturnType {
  cartProduct: cartProduct;
  setCartProduct: (cart: cartProduct) => void;
  Add(productId: string, price: number): CartFnReturn;
}
