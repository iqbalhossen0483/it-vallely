import { Dispatch, SetStateAction } from "react";
import BrandMenu from "./BrandMenu";
import FilterProduct from "./FilterProduct";

type Props = {
  filterPrice: number[] | null;
  setFilterPrice: Dispatch<SetStateAction<number[] | null>>;
};

const SideMenuBar = ({ filterPrice, setFilterPrice }: Props) => {
  return (
    <>
      <FilterProduct
        filterPrice={filterPrice}
        setFilterPrice={setFilterPrice}
      />
      <BrandMenu />
    </>
  );
};

export default SideMenuBar;
