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
}

const SideMenuInDrawer: FC<Props> = ({
  open,
  setDrawer,
  minMaxValue,
  value,
  setValue,
  filterProducts,
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
        />
      </div>
    </SwipeableDrawer>
  );
};

export default SideMenuInDrawer;
