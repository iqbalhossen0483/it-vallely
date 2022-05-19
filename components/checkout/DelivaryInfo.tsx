import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

type Props = { setDelivary: React.Dispatch<React.SetStateAction<string>> };
const DelivaryInfo = ({ setDelivary }: Props) => {
  const delivaryMethods = [
    { value: "home", label: "Home Delivery - 100৳" },
    { value: "store", label: "Store Pickup - 0৳" },
  ];
  return (
    <div className='delivary-info'>
      <h3>Delivery Method</h3>
      <p>Select a delivery method</p>
      <RadioGroup
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue='home'
        name='radio-buttons-group'
        onChange={(e) => setDelivary(e.target.value)}
      >
        {delivaryMethods.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default DelivaryInfo;
