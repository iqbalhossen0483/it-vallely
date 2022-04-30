import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const BrandMenu = () => {
  const brands = [
    "HP",
    "Dell",
    "Sumsung",
    "Razer",
    "MacBook",
    "Microsoft",
    "Acer",
    "Asus",
    "Avita",
  ];
  return (
    <div className='item'>
      <h3>Brand</h3>
      {brands.map((brand) => (
        <FormControlLabel
          className='block'
          key={brand}
          control={<Checkbox />}
          label={brand}
        />
      ))}
    </div>
  );
};

export default BrandMenu;
