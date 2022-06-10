import useStore from "../../contex/hooks/useStore";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import PostOrder from "./services/PostOrder";

const CashOnDelivary = () => {
  const store = useStore();
  const router = useRouter();

  const orderInfo = store?.State.orderInfo;
  if (orderInfo) {
    orderInfo.paymentMethod = "cash";
    orderInfo.status = "Pending";
  }

  return (
    <div className='payment-wrapper'>
      <h3>You can payment us when you will get the product</h3>
      {orderInfo && (
        <div className='flex justify-center mt-3'>
          <Button
            onClick={() => PostOrder(orderInfo, store, router)}
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
