import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import OrderSummeryTable from "../../components/shared/utilitize/OrderSummeryTable";
import useStore from "../../contex/hooks/useStore";

const OrderPlaced = () => {
  const store = useStore();
  const router = useRouter();
  if (store?.State.orderInfo === null) {
    router.push("/");
    return null;
  }
  return (
    <div className='bg-gray-100 py-10'>
      <div className='order-placed-container'>
        <h3>Your order has been placed</h3>
        <p>
          Your order {"#" + store?.State.orderInfo?.id} has been placed
          successfully. Do you have any questions about your order, feel free to
          call us on 01846770635 (10am to 5pm)
        </p>
        <div className='order-summery'>
          <div className='address'>
            <h3>Delivary address</h3>
            <p>
              {store?.State.orderInfo?.fname} {store?.State.orderInfo?.lname}
            </p>
            <p>{store?.State.orderInfo?.address}</p>
            <p>{store?.State.orderInfo?.email}</p>
            <p>{store?.State.orderInfo?.mobile}</p>
          </div>
          <div className='summery'>
            <h3>Order summery</h3>
            <OrderSummeryTable />
          </div>
        </div>
        <div className='flex justify-end'>
          <Button
            variant='contained'
            onClick={() => router.push("/")}
            className='bg-mui'
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
