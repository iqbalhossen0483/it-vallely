import { SwipeableDrawer } from "@mui/material";
import React, { Dispatch, FC, SetStateAction } from "react";
import SideMenuBar from "./SideMenuBar";

interface Props {
  open: boolean;
  setDrawer: (prev: boolean) => void;
  minMaxValue: number[];
  value: number[];
  setValue: Dispatch<SetStateAction<number[]>>;
  filterProducts(): void;
  filterBrandProducts(brands: string[]): void;
  brands: string[];
  filterBrand: string[];
  setFilterBrand: React.Dispatch<React.SetStateAction<string[]>>;
}

const SideMenuInDrawer: FC<Props> = ({
  open,
  setDrawer,
  minMaxValue,
  value,
  setValue,
  filterProducts,
  brands,
  filterBrandProducts,
  filterBrand,
  setFilterBrand,
}) => {
  return (
    <SwipeableDrawer
      open={open}
      anchor='right'
      onOpen={() => setDrawer(true)}
      onClose={() => setDrawer(false)}
    >
      <div className='side-menu-container p-5'>
        <SideMenuBar
          minMaxValue={minMaxValue}
          value={value}
          setValue={setValue}
          filterProducts={filterProducts}
          filterBrandProducts={filterBrandProducts}
          brands={brands}
          filterBrand={filterBrand}
          setFilterBrand={setFilterBrand}
        />
      </div>
    </SwipeableDrawer>
  );
};

export default SideMenuInDrawer;
