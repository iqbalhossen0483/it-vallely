import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";

type Props = {
  filterBrandProducts(brands: string[]): void;
  brands: string[];
};

const BrandMenu = ({ filterBrandProducts, brands }: Props) => {
  const [filterBrand, setFilterBrand] = useState<string[]>([]);

  function handleBrand(brand: string) {
    if (filterBrand.includes(brand)) {
      const exist = filterBrand.filter((item) => item !== brand);
      setFilterBrand(exist);
    } else {
      setFilterBrand((prev) => [...prev, brand]);
    }
  }
  useEffect(() => {
    filterBrandProducts(filterBrand);
  }, [filterBrand, filterBrandProducts]);

  return (
    <div className='item'>
      <h3>Brand</h3>
      {brands.map((brand) => (
        <FormControlLabel
          onClick={() => handleBrand(brand)}
          style={{ display: "block" }}
          key={brand}
          control={<Checkbox />}
          label={brand}
        />
      ))}
    </div>
  );
};

export default BrandMenu;
