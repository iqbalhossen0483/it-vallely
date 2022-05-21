import { useRouter } from "next/router";
import React from "react";
import useStore from "../../../contex/hooks/useStore";

const OrderSummeryTable = () => {
  const store = useStore();
  const router = useRouter();

  return (
    <div className='table'>
      <p>Sub-total:</p>
      <p>{store?.State.orderInfo?.subTotal}৳</p>
      <p>Delivary cost:</p>
      <p>{store?.State.orderInfo?.delivaryCost}৳</p>
      {store?.State.orderInfo?.discount && (
        <>
          <p>Discount:</p>
          <p>{store?.State.orderInfo?.discount}৳</p>
        </>
      )}
      <p>Total:</p>
      <p>{store?.State.orderInfo?.total}৳</p>
      {router.pathname !== "/checkout/payment" && (
        <>
          <p>Amount paid:</p>
          <p>0৳</p>
          <div className='due'>
            <p>Due:</p>
            <p>{store?.State.orderInfo?.total}৳</p>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummeryTable;
