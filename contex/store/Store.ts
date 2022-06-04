import {
  CartReturnType,
  FirebaseReturn,
  StatesReturnType,
} from "../contex-type";
import Cart from "../services/Cart";
import Firebase from "../services/Firebase";
import States from "../services/States";

export interface StoreReturnType {
  State: StatesReturnType;
  Carts: CartReturnType;
  firebase: FirebaseReturn;
}

function Store(): StoreReturnType {
  const State = States();
  const Carts = Cart();
  const firebase = Firebase();

  return {
    State,
    Carts,
    firebase,
  };
}

export default Store;
