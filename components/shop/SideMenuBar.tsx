import { Dispatch, SetStateAction } from "react";
import BrandMenu from "./BrandMenu";
import FilterProduct from "./FilterProduct";

type Props = {
  minMaxValue: number[];
  value: number[];
  setValue: Dispatch<SetStateAction<number[]>>;
};

const SideMenuBar = ({ minMaxValue, value, setValue }: Props) => {
  return (
    <>
      <FilterProduct
        minMaxValue={minMaxValue}
        value={value}
        setValue={setValue}
      />
      <BrandMenu />
    </>
  );
};

export default SideMenuBar;
