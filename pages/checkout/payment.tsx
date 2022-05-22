import { Button } from "@mui/material";
import React, { useState } from "react";
import CashOnDelivary from "../../components/checkout/CashOnDelivary";
import PaymentMethods from "../../components/checkout/PaymentMethods";
import OrderSummeryTable from "../../components/shared/utilitize/OrderSummeryTable";

export interface Methods {
  showCashOn: boolean;
  showBkash: boolean;
  showRocket: boolean;
  showCredit: boolean;
}

const Payment = () => {
  const [methods, setMethods] = useState<Methods>({
    showCashOn: false,
    showBkash: false,
    showRocket: false,
    showCredit: false,
  });

  return (
    <div className='payment-container'>
      <div className='payment-methods-container'>
        {/* payment-methods */}
        <PaymentMethods methods={methods} setmethods={setMethods} />

        {/* payment-summery */}
        <div className='payment-summery'>
          <h3>Order Summery</h3>
          <OrderSummeryTable />
        </div>
      </div>

      {/* payment-wrapper */}
      {methods.showCashOn && <CashOnDelivary />}

      {methods.showBkash && (
        <div className='payment-wrapper'>
          <h3>Bkash payment</h3>
        </div>
      )}
      {methods.showRocket && (
        <div className='payment-wrapper'>
          <h3>Rocket payment</h3>
        </div>
      )}
      {methods.showCredit && (
        <div className='payment-wrapper'>
          <h3>credit card</h3>
        </div>
      )}
    </div>
  );
};

export default Payment;
