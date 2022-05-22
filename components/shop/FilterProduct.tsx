import { Slider } from "@mui/material";
import React from "react";

type Props = {
  filterPrice: number[] | null;
  setFilterPrice: React.Dispatch<React.SetStateAction<number[] | null>>;
};

const FilterProduct = ({ filterPrice, setFilterPrice }: Props) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setFilterPrice(newValue as number[]);
  };

  return (
    <div className='item filter-wrapper'>
      <h3>Price Range</h3>
      {filterPrice && (
        <>
          <Slider
            value={filterPrice}
            onChange={handleChange}
            step={100}
            valueLabelDisplay='auto'
            max={filterPrice[1]}
          />
          <div className='show-range'>
            <p>{filterPrice[0]}</p>
            <p>{filterPrice[1]}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterProduct;
