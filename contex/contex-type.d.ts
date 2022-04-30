type cartProduct = {
  quantity: number;
  price: number;
};
interface StatesReturnType {
  alert: DefaultAlert;
  setAlert: (prev: DefaultAlert) => void;
}
interface CartReturnType {
  cartProduct: cartProduct;
  setCartProduct: (prev: cartProduct) => void;
  Add(productId: string, price: number): CartFnReturn;
}
