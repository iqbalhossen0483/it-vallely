import { Slider } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  minMaxValue: number[];
  value: number[];
  setValue: Dispatch<SetStateAction<number[]>>;
  filterProducts(): void;
};

const FilterProduct = ({
  minMaxValue,
  value,
  setValue,
  filterProducts,
}: Props) => {
  const updateFilter = (event: Event, value: number | number[]) => {
    setValue(value as number[]);
    filterProducts();
  };

  return (
    <div className='item filter-wrapper'>
      <h3>Price Range</h3>
      <Slider
        value={value}
        valueLabelDisplay='auto'
        onChange={(e, value) => updateFilter(e, value)}
        min={minMaxValue[0]}
        max={minMaxValue[1]}
      />
      <div className='show-range'>
        <p>{value[0]}</p>
        <p>{value[1]}</p>
      </div>
    </div>
  );
};

export default FilterProduct;
