import OrderSummeryTable from "../../components/shared/utilitize/OrderSummeryTable";
import useStore from "../../contex/hooks/useStore";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import Spinner from "../../components/shared/Spinner";

const OrderPlaced = () => {
  const store = useStore();
  const router = useRouter();
  const orderInfo = store?.State.orderInfo;
  useEffect(() => {
    if (!orderInfo) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='bg-gray-100 py-10'>
      {orderInfo ? (
        <div className='order-placed-container'>
          <h3>Your order has been placed</h3>
          <p>
            Your order {"#" + orderInfo?._id} has been placed successfully. Do
            you have any questions about your order, feel free to call us on
            01846770635 (10am to 5pm)
          </p>
          <div className='order-summery'>
            <div className='address'>
              <h3>Delivary address</h3>
              <p>
                {orderInfo?.fname} {orderInfo?.lname}
              </p>
              <p>{orderInfo?.address}</p>
              <p>{orderInfo?.mobile}</p>
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
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default OrderPlaced;
