import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Image from "next/image";
import React from "react";
type Props = { setPaymentMethod: React.Dispatch<React.SetStateAction<string>> };
const PaymentInfo = ({ setPaymentMethod }: Props) => {
  const paymentMethods = [
    { value: "cash", label: "Cash on Delivery" },
    { value: "online", label: "Online Payment" },
  ];
  return (
    <div className='payment-info'>
      <h3>Payment Method</h3>
      <p>Select a payment method</p>
      <RadioGroup
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue='cash'
        name='radio-buttons-group'
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        {paymentMethods.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
      <p className='font-semibold'>We accept:</p>
      <Image height={20} width={350} src='/card-logo.webp' alt='' />
    </div>
  );
};

export default PaymentInfo;
