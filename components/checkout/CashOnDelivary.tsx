import useStore from "../../contex/hooks/useStore";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const CashOnDelivary = () => {
  const store = useStore();
  const router = useRouter();

  const orderInfo = store?.State.orderInfo;

  async function postOrder(peyload: OrderInfo) {
    store?.State.setLoading(true);
    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(peyload),
    });
    const data = await res.json();
    if (res.ok) {
      if (data.insertedId) {
        store?.State.setAlert("Order placed successfully");
        peyload.id = data.insertedId;
        store?.State.setOrderInfo(peyload);
        if (router.query.multiple) {
          localStorage.removeItem("cart");
          store?.Carts.setCartProduct((prev) => {
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

  return (
    <div className='payment-wrapper'>
      <h3>You can payment us when you will get the product</h3>
      {orderInfo && (
        <div className='flex justify-center mt-3'>
          <Button
            onClick={() => postOrder(orderInfo)}
            variant='contained'
            disabled={store.State.loading}
            className='bg-mui'
          >
            Confirm order
          </Button>
        </div>
      )}
    </div>
  );
};

export default CashOnDelivary;
