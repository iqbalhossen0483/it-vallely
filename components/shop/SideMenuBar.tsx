import { Dispatch, SetStateAction } from "react";
import FilterProduct from "./FilterProduct";
import BrandMenu from "./BrandMenu";

type Props = {
  minMaxValue: number[];
  value: number[];
  setValue: Dispatch<SetStateAction<number[]>>;
  filterProducts(): void;
  filterBrandProducts(brands: string[]): void;
  brands: string[];
};

const SideMenuBar = ({
  minMaxValue,
  value,
  setValue,
  filterProducts,
  filterBrandProducts,
  brands,
}: Props) => {
  return (
    <>
      <FilterProduct
        minMaxValue={minMaxValue}
        value={value}
        setValue={setValue}
        filterProducts={filterProducts}
      />
      <BrandMenu filterBrandProducts={filterBrandProducts} brands={brands} />
    </>
  );
};

export default SideMenuBar;
