import { CartReturnType, StatesReturnType } from "../contex-type";
import Cart from "../services/Cart";
import States from "../services/States";

export interface StoreReturnType {
  State: StatesReturnType;
  Carts: CartReturnType;
}

function Store(): StoreReturnType {
  const State = States();
  const Carts = Cart();

  return {
    State,
    Carts,
  };
}

export default Store;
