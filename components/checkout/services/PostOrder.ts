import { StoreReturnType } from "../../../contex/store/Store";
import { NextRouter } from "next/router";

export default async function PostOrder(
  peyload: OrderInfo,
  store: StoreReturnType | null,
  router: NextRouter
) {
  const token = await store?.firebase.user?.getIdToken();
  const res = await fetch("/api/order", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      user_uid: `${store?.firebase.user?.uid}`,
      token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
    },
    body: JSON.stringify(peyload),
  });
  const data = await res.json();
  if (res.ok) {
    if (data.insertedId) {
      store?.State.setAlert("Order placed successfully");
      peyload._id = data.insertedId;
      store?.State.setOrderInfo(peyload);
      if (router.query.multiple) {
        localStorage.removeItem("cart");
        store?.Carts.setCartProduct(() => {
          return { price: 0, products: null, quantity: 0 };
        });
      }
      router.push("/checkout/orderPlaced");
    } else {
      store?.State.setAlert("Something went wrong");
    }
  } else {
    store?.State.setAlert(data.message);
  }
  store?.State.setLoading(false);
}
