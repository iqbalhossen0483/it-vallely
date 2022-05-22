import { Dispatch, SetStateAction } from "react";
import BrandMenu from "./BrandMenu";
import FilterProduct from "./FilterProduct";

type Props = {
  minMaxValue: number[];
  value: number[];
  setValue: Dispatch<SetStateAction<number[]>>;
  filterProducts(): void;
};

const SideMenuBar = ({
  minMaxValue,
  value,
  setValue,
  filterProducts,
}: Props) => {
  return (
    <>
      <FilterProduct
        minMaxValue={minMaxValue}
        value={value}
        setValue={setValue}
        filterProducts={filterProducts}
      />
      <BrandMenu />
    </>
  );
};

export default SideMenuBar;
