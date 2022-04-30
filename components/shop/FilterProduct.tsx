import { Slider } from "@mui/material";
import React, { useState } from "react";

const FilterProduct = () => {
  const [value, setValue] = useState<number[]>([1000, 5000]);

  const handleChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setValue(newValue as number[]);
  };
  return (
    <div className='item filter-wrapper'>
      <h3>Price Range</h3>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
        min={1000}
        max={5000}
      />
      <div className='show-range'>
        <p>{value[0]}</p>
        <p>{value[1]}</p>
      </div>
    </div>
  );
};

export default FilterProduct;
